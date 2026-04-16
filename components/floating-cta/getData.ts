import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContactData } from './type';

export async function getContactData(): Promise<ContactData> {
  const filePath = path.join(process.cwd(), 'contents', 'contact.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);

  // Parse le contenu Markdown pour extraire les informations
  const emailMatch = content.match(/### Email\s+([^\n]+)/);
  const whatsappMatch = content.match(/### WhatsApp\s+([^\n]+)/);
  const githubMatch = content.match(/- GitHub:\s+(.+)/);
  const linkedinMatch = content.match(/- LinkedIn:\s+(.+)/);
  const twitterMatch = content.match(/- Twitter:\s+(.+)/);
  const locationMatch = content.match(/### Location\s+([^\n]+)/);

  return {
    email: emailMatch ? emailMatch[1].trim() : '',
    whatsapp: whatsappMatch ? whatsappMatch[1].trim() : '',
    github: githubMatch ? githubMatch[1].trim() : undefined,
    linkedin: linkedinMatch ? linkedinMatch[1].trim() : undefined,
    twitter: twitterMatch ? twitterMatch[1].trim() : undefined,
    location: locationMatch ? locationMatch[1].trim() : undefined,
  };
}
