import React from 'react';
import { Breadcrumb } from '@/components/breadcrumb';
import { getAllPlaylists } from '@/lib/markdown-parser';

export const metadata = {
  title: 'Mes Playlists - Chris Mwanya',
  description: 'Découvrez mes playlists Spotify et YouTube préférées',
};

export default function PlaylistsPage() {
  const playlists = getAllPlaylists();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-gray-950 dark:via-gray-900 dark:to-neutral-900">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-main/20 to-neutral-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-neutral-500/20 to-main/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-t from-neutral-700/20 to-main/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: '🎵 Mes Playlists' }]} />

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-main via-neutral-600 to-neutral-800 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            🎵 Mes Playlists
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Découvrez ma sélection musicale pour coder, me détendre et
            m&apos;inspirer
          </p>
        </header>

        {/* Playlists Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {playlists.map((playlist, index) => {
            const platformConfig = {
              spotify: {
                color: 'bg-gray-800',
                hoverColor:
                  'hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-950',
                icon: 'icon-[mdi--spotify]',
                label: 'Spotify',
              },
              youtube: {
                color: 'bg-gray-800',
                hoverColor:
                  'hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-950',
                icon: 'icon-[mdi--youtube]',
                label: 'YouTube',
              },
            };

            const config =
              platformConfig[
                playlist.platform.toLowerCase() as 'spotify' | 'youtube'
              ] || platformConfig.spotify;

            return (
              <article
                key={index}
                className={`stagger-${(index % 5) + 1} glass-card group animate-fade-in-up overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div
                  className={`${config.color} p-6 transition-all duration-300 ${config.hoverColor}`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <span
                        className={`${config.icon} mr-1 text-sm text-white`}
                      />
                      {config.label}
                    </span>
                    <div className="shimmer h-2 w-2 animate-pulse rounded-full bg-white/50" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {playlist.title}
                  </h2>
                  {playlist.description && (
                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                      {playlist.description}
                    </p>
                  )}
                </div>

                {/* Embed Container */}
                <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
                  <iframe
                    src={playlist.embedUrl || undefined}
                    width="100%"
                    height="352"
                    // className="h-full w-full"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={playlist.title}
                  />
                  {/* Gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="animate-fade-in text-sm text-muted-foreground">
            ✨ Ces playlists évoluent régulièrement selon mes découvertes
            musicales
          </p>
        </footer>
      </div>
    </div>
  );
}
