import React from 'react';
import { Project as ProjectType } from '@/graphql/graphql';
import LinkIcon from '@/components/icon-link/link-icon';

export const ProjectComponent: React.FC<ProjectType> = ({
  title,
  description,
  link,
  technos,
}) => {
  return (
    <div className="rounded-lg px-3 py-6 hover:bg-primary-foreground">
      <h2 className="mb-3 text-xl font-semibold">{title} ✨</h2>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      {technos?.data &&
        technos.data.length > 0 &&
        technos.data.map((techno) => {
          return (
            <span
              key={techno?.attributes?.name}
              className="mr-2 rounded-full bg-muted px-2 py-1 text-xs"
            >
              {techno?.attributes?.name}
            </span>
          );
        })}
      <div className="mt-5">
        {link && <LinkIcon href={link} iconClassName="icon-[ph--link-bold]" />}
      </div>
    </div>
  );
};
