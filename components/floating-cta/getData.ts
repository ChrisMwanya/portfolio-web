import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContactData } from './type';

export async function getContactData(): Promise<ContactData> {
  const filePath = path.join(process.cwd(), 'contents', 'contact.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);

  // Parse le contenu Markdown pour extraire les informations
  const emailMatch = content.match(/### Email\n(.+)/);
  const whatsappMatch = content.match(/### WhatsApp\n(.+)/);
  const githubMatch = content.match(/- GitHub: (.+)/);
  const linkedinMatch = content.match(/- LinkedIn: (.+)/);
  const twitterMatch = content.match(/- Twitter: (.+)/);
  const locationMatch = content.match(/### Location\n(.+)/);

  return {
    email: emailMatch ? emailMatch[1].trim() : '',
    whatsapp: whatsappMatch ? whatsappMatch[1].trim() : '',
    github: githubMatch ? githubMatch[1].trim() : undefined,
    linkedin: linkedinMatch ? linkedinMatch[1].trim() : undefined,
    twitter: twitterMatch ? twitterMatch[1].trim() : undefined,
    location: locationMatch ? locationMatch[1].trim() : undefined,
  };
}
