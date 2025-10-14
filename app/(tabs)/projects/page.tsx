import React from 'react';
import { getAllProjects } from '@/lib/markdown-parser';
import { ProjectComponent } from '@/components/cards/project';

const Project = () => {
  const data = getAllProjects();

  return (
    <div className="animate-fade-in">
      {/* Header section avec glassmorphism */}
      <div className="mb-8 rounded-2xl border border-white/20 bg-white/40 p-6 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/40">
        <h1 className="mb-3 bg-gradient-to-r from-main via-amber-600 to-main bg-clip-text text-3xl font-bold text-transparent">
          Mes Projets
        </h1>
        <p className="mb-2 text-muted-foreground">
          {`J'ai travaillé sur quelques projets récemment, en voici quelques-uns `}
        </p>
        <p className="text-sm text-muted-foreground">
          {`N'hésitez pas à les consulter et à me faire savoir ce que vous en pensez ! 😊😎 `}
        </p>
      </div>

      {/* Projects grid */}
      <div className="mt-10 gap-y-4">
        {data?.map(({ title, description, link, image, imageAlt }, index) => {
          const staggerClass = `stagger-${Math.min(index + 1, 5)}`;
          return (
            <div
              key={title ?? undefined}
              className={`animate-fade-in-up ${staggerClass}`}
            >
              <ProjectComponent
                title={title ?? null}
                description={description ?? null}
                link={link ?? null}
                image={image}
                imageAlt={imageAlt}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
