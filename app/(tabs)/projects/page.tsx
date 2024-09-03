'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { ProjectComponent } from '@/components/cards/project/project';
import { GET_PROJECTS } from './getData';
import type { ProjectEntity } from '@/graphql/graphql';

const Project = () => {
  const { loading, error, data: projects } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <p className="my-2">
        {`I've been working on a few projects in recently, here are a few of them `}
      </p>
      <div className="my-4">
        {`Feel free to check them out and let me know what you think! 😊😎 `}
      </div>
      <div className="mt-10 gap-y-4">
        {projects.projects.data?.map(({ attributes }: ProjectEntity) => (
          <ProjectComponent
            key={attributes?.title ?? undefined}
            title={attributes?.title ?? null}
            description={attributes?.description ?? null}
            link={attributes?.link ?? null}
            technos={attributes?.technos}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
