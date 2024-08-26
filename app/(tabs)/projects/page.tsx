import { ProjectComponent } from '@/components/cards/project/project';
import React from 'react';
import { ProjectType } from '@/components/cards/project';

const projects: ProjectType[] = [
  {
    title: 'Kadea Academy',
    description:
      'Kadea Academy is a platform that offers a variety of courses in web development, design, and digital marketing. I am a coach and trainer at Kadea Academy, where I get the opportunity to share my expertise with motivated learners while continuously exploring the latest technologies.',
    link: 'https://kadea.academy',
    technos: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Kadea Blog',
    description:
      'Kadea Blog is a platform where I share my thoughts on various topics, including web development, design, and digital marketing. I also share tutorials and guides to help others learn and grow in the tech industry.',
    link: 'https://kadea.blog',
    technos: ['Gatsby', 'Tailwind CSS'],
  },
  {
    title: 'Kadea Studio',
    description:
      'Kadea Studio is a digital agency that offers web development, design, and digital marketing services. I am the founder and lead developer at Kadea Studio, where I work with a team of talented professionals to create high-quality websites and applications for our clients.',
    link: 'https://kadea.studio',
    technos: ['React', 'Next.js', 'Tailwind CSS', 'Strapi'],
  },
];

const Project = () => {
  return (
    <div>
      <p className="my-2">
        {`I've been working on a few projects in recently, here are a few of them `}
      </p>
      <div className="my-4">
        {`Feel free to check them out and let me know what you think! 😊😎 `}
      </div>
      <div className="mt-10 gap-y-4">
        {projects.map((project) => (
          <ProjectComponent
            key={project.title}
            title={project.title}
            description={project.description}
            link={project.link}
            technos={project.technos}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
