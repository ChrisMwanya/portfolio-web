import React from 'react';
import { ProjectType } from './index';
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
      {technos &&
        technos.length > 0 &&
        technos.map((techno) => (
          <span
            key={techno}
            className="mr-2 rounded-full bg-muted px-2 py-1 text-xs"
          >
            {techno}
          </span>
        ))}
      <div className="mt-5">
        {link && <LinkIcon href={link} iconClassName="icon-[ph--link-bold]" />}
      </div>
    </div>
  );
};
