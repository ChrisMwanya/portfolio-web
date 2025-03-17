import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getAllTechnos() {
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
}
