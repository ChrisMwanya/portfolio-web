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
        const match = line.match(/\[(.*?)\]\((.*?)\)/);
        currentProject.link = match ? match[2] : '';
      } else if (line.startsWith('**Image**')) {
        const match = line.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          currentProject.imageAlt = match[1];
          currentProject.image = match[2];
        }
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
  description?: string;
  platform: 'spotify' | 'youtube';
  embedUrl: string;
}

export const getAllPlaylists = (): Playlist[] => {
  const filePath = path.join(process.cwd(), 'contents', 'playlists.md');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

  let currentPlaylist: Partial<Playlist> | null = null;
  const playlists: Playlist[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (
        currentPlaylist &&
        currentPlaylist.embedUrl &&
        currentPlaylist.title &&
        currentPlaylist.platform
      ) {
        playlists.push(currentPlaylist as Playlist);
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

  if (
    currentPlaylist &&
    currentPlaylist.embedUrl &&
    currentPlaylist.title &&
    currentPlaylist.platform
  ) {
    playlists.push(currentPlaylist as Playlist);
  }

  return playlists;
};
