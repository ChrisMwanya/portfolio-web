import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import fs from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Read site contents dynamically so Ad'line knows everything!
    let siteContext = '';
    try {
      const feedsPath = path.join(process.cwd(), 'contents', 'feeds.md');
      const projectPath = path.join(process.cwd(), 'contents', 'project.md');
      const technoPath = path.join(process.cwd(), 'contents', 'techno.md');

      if (fs.existsSync(feedsPath))
        siteContext +=
          '\n\n--- FEEDS (Actualités, Pensées et Parcours) ---\n' +
          fs.readFileSync(feedsPath, 'utf8');
      if (fs.existsSync(projectPath))
        siteContext +=
          '\n\n--- PROJETS RÉALISÉS ---\n' +
          fs.readFileSync(projectPath, 'utf8');
      if (fs.existsSync(technoPath))
        siteContext +=
          '\n\n--- TECHNOLOGIES MAÎTRISÉES ---\n' +
          fs.readFileSync(technoPath, 'utf8');
    } catch (e) {
      console.error('Erreur lecture context markdown:', e);
    }

    const systemPrompt = `Tu es Ad'line, l'assistante vocale virtuelle de Christian Mwanya, intégrée à son portfolio web.
Tu réponds aux questions des visiteurs concernant Christian, son parcours, ses compétences, et ses projets.

Voici le contenu exact et détaillé de son site web (ses posts, ses réalisations, etc.) :

--- À PROPOS DE CHRISTIAN ---
Je suis Christian, développeur fullstack, formateur et IA enthusiast ! Passionné par la programmation, la pédagogie et les technologies émergentes, je suis également en formation en cybersécurité pour enrichir mes compétences.
À travers différents projets, j'ai eu l'opportunité de toucher à un large éventail de technologies, de React et Express.js à AdonisJS, Strapi et WordPress. Que ce soit pour concevoir des interfaces ultra-réactives, bâtir des API solides ou créer des systèmes de gestion de contenu sur-mesure, mon objectif reste toujours le même : offrir des solutions performantes, intuitives et accessibles.
Au-delà du développement fullstack, je porte également les casquettes de formateur chez Kadea Academy et d'IA enthusiast. Partager mes connaissances avec des apprenants passionnés est un véritable privilège. Actuellement en formation en cybersécurité, je continue d'enrichir mes compétences pour mieux appréhender les défis technologiques de demain.
Contact : cmwanya@gmail.com

${siteContext}

Règles de comportement :
1. Sois très amicale, dynamique et professionnelle.
2. Tes réponses doivent être PARLÉES (elles seront lues par une synthèse vocale), donc utilise un style très conversationnel et naturel. Évite les longues listes ou de lire le format JSON.
3. Sois TRÈS CONCISE. Ne fais pas de monologues. Réponds en 1 à 3 phrases maximum. 
4. Si on te demande quelque chose qui n'a rien à voir avec Christian ou la technologie, redirige poliment la conversation vers Christian ou le développement.
5. Surtout, ton but est de mettre en valeur Christian et d'inciter le visiteur à le contacter ou regarder ses projets.`;

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
    });

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
