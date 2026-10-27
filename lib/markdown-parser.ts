import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getAllTechnos = () => {
  const filePath = path.join(process.cwd(), 'contents', 'techno.md');

  if (!fs.existsSync(filePath)) {
    return Response.json({ error: 'Markdown file not found' }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { content } = matter(fileContent);
  const lines = content.split('\n').filter((line) => line.trim() !== '');

  let currentSection = '';
  const result: Record<
    string,
    { name: string; icon: string; description: string }[]
  > = {};

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').trim();
      result[currentSection] = [];
    } else if (line.startsWith('- ')) {
      const match = line.match(/- (.*?) !\[(.*?)\]\((.*?)\) : (.*)/);
      if (match && currentSection) {
        const [, name, , icon, description] = match;
        result[currentSection].push({ name, icon, description });
      }
    }
  });

  return [result]; // Retourne un tableau contenant un objet avec la section
};

export type Feed = {
  id: number;
  title: string;
  content: {
    date: string;
    isPinned: boolean;
    name: string;
    statusIcon: string;
    status: string;
    content: string;
    spotify?: string;
    image?: string;
  };
};

export const getAllFeeds = () => {
  const filePath = path.join(process.cwd(), 'contents', 'feeds.md');

  // Vérifier si le fichier existe
  if (!fs.existsSync(filePath)) {
    return Response.json({ error: 'Markdown file not found' }, { status: 404 });
  }

  // Lire le contenu du fichier
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Extraire les lignes non vides
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  const feeds: Feed[] = [];
  let currentFeed: Partial<Feed> = {};
  let isReadingJSON = false;
  let jsonContentLines: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith('### ID: ')) {
      // Sauvegarder l'item précédent si complet
      if (currentFeed.id && currentFeed.title && currentFeed.content) {
        feeds.push(currentFeed as Feed);
      }
      // Commencer un nouvel item
      currentFeed = { id: parseInt(line.replace('### ID: ', '').trim(), 10) };
      jsonContentLines = [];
      isReadingJSON = false;
    } else if (line.startsWith('**Titre**:')) {
      currentFeed.title = line.replace('**Titre**:', '').trim();
    } else if (line.startsWith('```')) {
      isReadingJSON = !isReadingJSON;
      if (!isReadingJSON && jsonContentLines.length > 0) {
        try {
          currentFeed.content = JSON.parse(jsonContentLines.join('\n'));
        } catch (error) {
          console.error(
            `Erreur de parsing JSON pour l'ID ${currentFeed.id}:`,
            error,
          );
          currentFeed.content = {
            date: '',
            isPinned: false,
            name: '',
            statusIcon: '',
            status: '',
            content: '',
            spotify: undefined,
            image: undefined,
          };
        }
        jsonContentLines = [];
      }
    } else if (isReadingJSON) {
      jsonContentLines.push(line);
    }
  });

  // Ajouter la dernière entrée s'il y en a une
  if (currentFeed.id && currentFeed.title && currentFeed.content) {
    feeds.push(currentFeed as Feed);
  }

  return feeds;
};

interface Project {
  title: string;
  description?: string;
  link?: string;
  image?: string;
  imageAlt?: string;
  technos?: string[];
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

export const getAllProjects = (): Project[] => {
  const filePath = path.join(process.cwd(), 'contents', 'project.md');

  if (!fs.existsSync(filePath)) {
    throw new Error('Markdown file not found');
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  let currentProject: Project | null = null;
  const projects: Project[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (currentProject) {
        projects.push(currentProject);
      }
      currentProject = { title: line.replace('## ', '').trim() };
    } else if (currentProject) {
      if (line.startsWith('**Description**')) {
        currentProject.description = line.split(': ')[1]?.trim();
      } else if (line.startsWith('**Lien**')) {
        const linkMatch = /\[(.*?)\]\((.*?)\)/.exec(line);
        currentProject.link = linkMatch ? linkMatch[2] : '';
      } else if (line.startsWith('**Image**')) {
        const imageMatch = /\[(.*?)\]\((.*?)\)/.exec(line);
        if (imageMatch) {
          currentProject.imageAlt = imageMatch[1];
          currentProject.image = imageMatch[2];
        }
      } else if (line.startsWith('**Technos**')) {
        const technosString = line.split(': ')[1]?.trim();
        currentProject.technos = technosString
          ? technosString.split(',').map((t) => t.trim())
          : [];
      }
    }
  });

  if (currentProject) {
    projects.push(currentProject);
  }

  return projects;
};

interface Playlist {
  id?: string;
  title: string;
  description?: string | null;
  platform: 'spotify' | 'youtube';
  embedUrl: string | null;
}

export const getAllPlaylists = (): Playlist[] => {
  const filePath = path.join(process.cwd(), 'contents', 'playlists.md');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  let currentPlaylist: Partial<Playlist> = {};
  const playlists: Playlist[] = [];

  const isValidPlaylist = (
    playlist: Partial<Playlist>,
  ): playlist is Playlist => {
    return Boolean(playlist.embedUrl && playlist.title && playlist.platform);
  };

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (isValidPlaylist(currentPlaylist)) {
        playlists.push(currentPlaylist);
      }
      currentPlaylist = {
        id: line.replace('## ', '').trim().toLowerCase().replace(/\s+/g, '-'),
        title: line.replace('## ', '').trim(),
        platform: 'spotify', // Default value, will be overridden
        embedUrl: '',
      };
    } else if (currentPlaylist) {
      if (line.startsWith('**Platform**')) {
        const platform = line.split(': ')[1]?.trim().toLowerCase();
        if (platform === 'spotify' || platform === 'youtube') {
          currentPlaylist.platform = platform;
        }
      } else if (line.startsWith('**Description**')) {
        currentPlaylist.description = line.split(': ')[1]?.trim();
      } else if (line.startsWith('**EmbedUrl**')) {
        currentPlaylist.embedUrl = line.split(': ')[1]?.trim();
      }
    }
  });

  if (isValidPlaylist(currentPlaylist)) {
    playlists.push(currentPlaylist);
  }

  return playlists;
};

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  expiration?: string;
  description?: string;
  link?: string;
  credentialId?: string;
  image?: string;
  skills?: string[];
}

export const getAllCertifications = (): Certification[] => {
  const filePath = path.join(process.cwd(), 'contents', 'certifications.md');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  // Remove HTML comments (used for the template in the markdown file)
  const fileContent = fs
    .readFileSync(filePath, 'utf-8')
    .replace(/<!--[\s\S]*?-->/g, '');
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  let currentCertification: Partial<Certification> = {};
  const certifications: Certification[] = [];

  const isValidCertification = (
    certification: Partial<Certification>,
  ): certification is Certification => {
    return Boolean(certification.title && certification.issuer);
  };

  // Value after the first ": " (keeps URLs and values containing ":" intact)
  const getValue = (line: string) =>
    line.slice(line.indexOf(':') + 1).trim() || undefined;

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (isValidCertification(currentCertification)) {
        certifications.push(currentCertification);
      }
      const title = line.replace('## ', '').trim();
      currentCertification = {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
      };
    } else if (line.startsWith('**Organisme**')) {
      currentCertification.issuer = getValue(line);
    } else if (line.startsWith('**Date**')) {
      currentCertification.date = getValue(line);
    } else if (line.startsWith('**Expiration**')) {
      currentCertification.expiration = getValue(line);
    } else if (line.startsWith('**Description**')) {
      currentCertification.description = getValue(line);
    } else if (line.startsWith('**Lien**')) {
      currentCertification.link = getValue(line);
    } else if (line.startsWith('**Identifiant**')) {
      currentCertification.credentialId = getValue(line);
    } else if (line.startsWith('**Image**')) {
      currentCertification.image = getValue(line);
    } else if (line.startsWith('**Competences**')) {
      currentCertification.skills = getValue(line)
        ?.split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
  });

  if (isValidCertification(currentCertification)) {
    certifications.push(currentCertification);
  }

  return certifications.sort((a, b) =>
    (a.date ?? '') < (b.date ?? '') ? 1 : -1,
  );
};

export interface Blog {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  slug: string;
  content: string;
}

export const getAllBlogs = (): Blog[] => {
  const blogsDirectory = path.join(process.cwd(), 'contents', 'blogs');

  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        tags: data.tags || [],
        image: data.image || '',
        content,
      } as Blog;
    });

  return allBlogsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getBlogBySlug = (slug: string): Blog | null => {
  const fullPath = path.join(process.cwd(), 'contents', 'blogs', `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    image: data.image || '',
    content,
  } as Blog;
};
