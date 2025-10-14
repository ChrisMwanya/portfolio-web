import React from 'react';
import { Project as ProjectType } from '@/graphql/graphql';
import LinkIcon from '@/components/icon-link/link-icon';
import { ExternalLink, Globe } from 'lucide-react';
import Image from 'next/image';

export const ProjectComponent: React.FC<
  ProjectType & { image?: string; imageAlt?: string }
> = ({ title, description, link, technos, image, imageAlt }) => {
  // Generate a gradient based on project title (for visual variety)
  const gradients = [
    'from-blue-500/20 to-purple-500/20',
    'from-green-500/20 to-teal-500/20',
    'from-orange-500/20 to-red-500/20',
    'from-pink-500/20 to-rose-500/20',
    'from-indigo-500/20 to-blue-500/20',
  ];
  const gradientIndex = (title?.length || 0) % gradients.length;
  const gradient = gradients[gradientIndex];

  // Helper function to safely get hostname from URL
  const getHostname = (url: string | null | undefined): string => {
    if (!url) return 'preview';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      // If URL is invalid (like '#'), return the link as-is or 'preview'
      return url === '#' ? 'preview' : url;
    }
  };

  return (
    <div className="group relative mb-6 overflow-hidden rounded-2xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-900/70">
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-main/20 via-purple-500/20 to-main/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="grid gap-0 md:grid-cols-[300px_1fr]">
        {/* Preview Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-main/10 via-purple-500/10 to-transparent md:h-auto">
          {/* Mockup browser window */}
          <div className="absolute inset-0 flex flex-col">
            {/* Browser header */}
            <div className="flex items-center gap-2 border-b border-white/20 bg-white/30 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/30">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <div className="ml-2 flex-1 rounded bg-white/40 px-3 py-1 text-xs text-muted-foreground dark:bg-gray-700/40">
                <Globe className="mr-1 inline h-3 w-3" />
                {getHostname(link)}
              </div>
            </div>

            {/* Preview content with gradient and pattern */}
            <div className={`relative flex-1 bg-gradient-to-br ${gradient}`}>
              {image ? (
                // Real project screenshot if provided
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt || title || 'Project preview'}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ) : (
                // Fallback placeholder design
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2 text-4xl opacity-20">💻</div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Preview
                      </p>
                    </div>
                  </div>
                  {/* Animated grid pattern */}
                  <div className="grid-pattern absolute inset-0 opacity-10" />
                </>
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-3 flex items-start justify-between">
            <h2 className="text-xl font-semibold transition-colors group-hover:text-main">
              {title} ✨
            </h2>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main transition-all hover:scale-105 hover:bg-main/20 dark:bg-main/20 dark:text-amber-400"
              >
                Voir <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {technos?.data && technos.data.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {technos.data.map((techno, index) => {
                return (
                  <span
                    key={techno?.attributes?.name || index}
                    className="group/tag relative overflow-hidden rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main backdrop-blur-sm transition-all hover:scale-105 hover:bg-main/20 dark:bg-main/20 dark:text-amber-400"
                  >
                    {/* Shimmer effect on hover */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/tag:translate-x-full" />
                    <span className="relative z-10">
                      {techno?.attributes?.name}
                    </span>
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
      </div>
    </div>
  );
};
