import H2 from '@/components/ui/title-h2';
import React from 'react';
import Image from 'next/image';
import { Link } from '@/components/ui/link';
import Stacks from '@/components/stacks/stacks';

const About = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-foreground">
        <H2>Mbote! 👋</H2> <span>(Salut en Lingala)</span>
      </div>

      <p className="my-4">
        {`Je suis Christian, développeur fullstack, formateur et IA enthusiast ! Passionné par la programmation, la pédagogie et les technologies émergentes, je suis également en formation en cybersécurité pour enrichir mes compétences.`}
      </p>

      <div className="my-10 h-full w-full">
        <Image
          src={
            'https://res.cloudinary.com/chrismwanya/image/upload/v1726043986/portfolio_assets/outside_silikin.webp'
          }
          width={300}
          height={500}
          className="my-1 rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
          alt={''}
          layout="responsive"
        />
      </div>

      <div className="my-8">
        <H2>Technologies & Outils 🛠️</H2>
        <p className="my-4 text-muted-foreground">
          Voici les principales technologies et outils que j&apos;utilise dans
          mes projets :
        </p>
        <Stacks className="flex flex-wrap gap-2" />
      </div>

      <p>
        {`À travers différents projets, j'ai eu l'opportunité de toucher à un large éventail de technologies, de React et Express.js à AdonisJS, Strapi et WordPress. Que ce soit pour concevoir des interfaces ultra-réactives, bâtir des API solides ou créer des systèmes de gestion de contenu sur-mesure, mon objectif reste toujours le même : offrir des solutions performantes, intuitives et accessibles.`}
      </p>
      <p className="my-4">
        {`Au-delà du développement fullstack, je porte également les casquettes de formateur chez Kadea Academy et d'IA enthusiast. Partager mes connaissances avec des apprenants passionnés est un véritable privilège. Actuellement en formation en cybersécurité, je continue d'enrichir mes compétences pour mieux appréhender les défis technologiques de demain.`}
      </p>
      <p>
        {`Si vous souhaitez discuter, en savoir plus ou simplement dire bonjour,
        n'hésitez pas à `}
        <Link href="mailto:cmwanya@gmail.com">me contacter !</Link>
      </p>

      <p className="my-4">Restez inspiré !</p>
    </>
  );
};

export default About;
