import React from 'react';
import { getAllProjects } from '@/lib/markdown-parser';
import { ProjectComponent } from '@/components/cards/project';

const Project = () => {
  const data = getAllProjects();

  return (
    <div>
      <p className="my-2">
        {`J'ai travaillé sur quelques projets récemment, en voici quelques-uns `}
      </p>
      <div className="my-4">
        {`N'hésitez pas à les consulter et à me faire savoir ce que vous en pensez ! 😊😎 `}
      </div>

      <div className="mt-10 gap-y-4">
        {data?.map(({ title, description, link }) => (
          <ProjectComponent
            key={title ?? undefined}
            title={title ?? null}
            description={description ?? null}
            link={link ?? null}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
