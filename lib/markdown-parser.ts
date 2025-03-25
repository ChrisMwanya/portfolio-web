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
