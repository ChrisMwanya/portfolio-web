import H2 from '@/components/ui/title-h2';
import React from 'react';
import Image from 'next/image';
import { Link } from '@/components/ui/link';

const About = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-foreground">
        <H2>Mbote! 👋</H2> <span>(Salut en Lingala)</span>
      </div>

      <p className="my-4">
        {`Je suis Christian, développeur fullstack passionné par la programmation et la pédagogie !`}
      </p>

      <div className="my-10 h-full w-full">
        <Image
          src={
            'https://res.cloudinary.com/chrismwanya/image/upload/v1726043986/portfolio_assets/outside_silikin.webp'
          }
          width={300}
          height={500}
          className="my-1 rounded-xl object-cover"
          alt={''}
          layout="responsive"
        />
      </div>
      <p>
        {`À travers différents projets, j'ai eu l'opportunité de toucher à un large éventail de technologies, de React et Express.js à AdonisJS, Strapi et WordPress. Que ce soit pour concevoir des interfaces ultra-réactives, bâtir des API solides ou créer des systèmes de gestion de contenu sur-mesure, mon objectif reste toujours le même : offrir des solutions performantes, intuitives et accessibles.`}
      </p>
      <p className="my-4">
        {`En plus de mon rôle de développeur fullstack, je suis également coach et formateur à Kadea Academy. C'est un véritable privilège de partager mon expertise avec des apprenants passionnés, tout en restant à l'affût des dernières innovations technologiques.`}
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
