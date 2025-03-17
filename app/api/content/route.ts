import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'contents', 'content.md');

  if (!fs.existsSync(filePath)) {
    return Response.json({ error: 'Markdown file not found' }, { status: 404 });
  }

  const markdown = fs.readFileSync(filePath, 'utf-8');
  const sections = markdown.split(/\n## /).filter(Boolean);

  const parsedData = sections.map((section) => {
    const lines = section.split('\n').filter((line) => line.trim() !== '');
    const title = lines.length > 0 ? lines && lines.shift().trim() : 'Untitled';
    const items = lines
      .map((line) => {
        const match = line.match(/- (.+?) : (.+)/);
        return match
          ? { name: match[1].trim(), description: match[2].trim() }
          : null;
      })
      .filter(Boolean);

    return { items, title };
  });

  return Response.json(parsedData);
}
