import H2 from '@/components/ui/title-h2';
import React from 'react';
import Image from 'next/image';
import { Link } from '@/components/ui/link';

const About = () => {
  return (
    <>
      <div className="flex items-center gap-2 text-foreground">
        <H2>Mbote! 👋</H2> <span>(Hello in Lingala)</span>
      </div>

      <p className="my-4">
        {`Hi, I'm Christian, a fullstack developer passionate about building web
        and mobile applications!`}
      </p>
      <p>
        {` While I thrive on autonomy, I equally enjoy collaborating with teams,
        whether on-site or remotely. What I love most is not only sharing my
        knowledge but also my passion for coding. I've had the privilege of
        guiding those who want to break into the tech world, helping them
        develop their skills and grow within this industry.`}
      </p>
      <div className="my-10 h-full w-full">
        <Image
          src={'/assets/images/aboutImage.webp'}
          width={300}
          height={500}
          className="my-1 rounded-xl object-cover"
          alt={''}
          layout="responsive"
        />
      </div>
      <p>
        {`Throughout various projects, I've worked with a wide range of
        technologies, from React and Express.js to AdonisJS, Strapi, and
        WordPress. Whether it's designing responsive interfaces, architecting
        robust APIs, or crafting custom content management systems, I always
        strive to deliver high-performance and accessible solutions.`}
      </p>
      <p className="my-4">
        {`  In addition to being a fullstack developer, I'm also a coach and trainer
        at Kadea Academy. There, I get the opportunity to share my expertise
        with motivated learners while continuously exploring the latest
        technologies.`}
      </p>
      <p>
        {`If you're up for a chat, want to learn more, or just want to say hi,
        feel free to `}
        <Link href="mailto:cmwanya@gmail.com">reach out !</Link>
      </p>

      <p className="my-4">Stay inspired!</p>
    </>
  );
};

export default About;
