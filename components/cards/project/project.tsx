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
    <div className="group relative mb-6 animate-fade-in-up rounded-xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-900/70">
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-main/20 via-purple-500/20 to-main/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <h2 className="mb-3 text-xl font-semibold transition-colors group-hover:text-main">
        {title} ✨
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>

      {technos?.data && technos.data.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {technos.data.map((techno) => {
            return (
              <span
                key={techno?.attributes?.name}
                className="rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main backdrop-blur-sm transition-all hover:scale-105 hover:bg-main/20 dark:bg-main/20 dark:text-amber-400"
              >
                {techno?.attributes?.name}
              </span>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        {link && (
          <LinkIcon
            href={link}
            iconClassName="icon-[ph--link-bold] transition-transform group-hover:scale-110"
          />
        )}
      </div>
    </div>
  );
};
