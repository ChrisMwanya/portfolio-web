'use client';

import React, { useState, useMemo } from 'react';
import { ProjectComponent } from './index';
import { ProjectType } from './type';

interface ProjectsFilterProps {
  projects: ProjectType[];
}

export const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Tous');

  // Extract all unique technologies from all projects
  const allTechnos = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technos?.forEach((tech) => techSet.add(tech));
    });
    return ['Tous', ...Array.from(techSet).sort()];
  }, [projects]);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') return projects;
    return projects.filter((project) =>
      project.technos?.includes(activeFilter),
    );
  }, [projects, activeFilter]);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {allTechnos.map((tech) => {
          const isActive = activeFilter === tech;
          return (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                isActive
                  ? 'bg-main text-white shadow-lg shadow-main/30'
                  : 'bg-white/60 text-muted-foreground hover:bg-main/10 hover:text-main dark:bg-gray-800/60 dark:hover:bg-main/20'
              }`}
            >
              {/* Shine effect on active */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
              <span className="relative">{tech}</span>
              {/* Count badge */}
              {tech !== 'Tous' && (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-white/30 text-white'
                      : 'bg-main/10 text-main dark:bg-main/20'
                  }`}
                >
                  {projects.filter((p) => p.technos?.includes(tech)).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Projects count indicator */}
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {filteredProjects.length === projects.length
          ? `${projects.length} projet${projects.length > 1 ? 's' : ''} au total`
          : `${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} avec ${activeFilter}`}
      </p>

      {/* Projects List */}
      <div className="gap-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(
            ({ title, description, link, image, imageAlt, technos }, index) => (
              <div
                key={title ?? index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectComponent
                  title={title ?? null}
                  description={description ?? null}
                  link={link ?? null}
                  image={image}
                  imageAlt={imageAlt}
                  technos={technos}
                />
              </div>
            ),
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-5xl opacity-30">🔍</div>
            <p className="text-muted-foreground">
              Aucun projet avec cette technologie
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
