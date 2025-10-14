import React from 'react';
import { PlaylistType } from './type';
import { Music, Youtube } from 'lucide-react';

export const PlaylistCard: React.FC<PlaylistType> = ({
  title,
  description,
  platform,
  embedUrl,
}) => {
  const platformConfig = {
    spotify: {
      icon: Music,
      color: 'text-green-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
      name: 'Spotify',
    },
    youtube: {
      icon: Youtube,
      color: 'text-red-500',
      gradient: 'from-red-500/20 to-rose-500/20',
      name: 'YouTube',
    },
  };

  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-900/70">
      {/* Gradient glow effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-main/20 via-purple-500/20 to-main/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Platform badge */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm dark:bg-gray-900/90">
        <Icon className={`h-4 w-4 ${config.color}`} />
        <span className="text-xs font-medium">{config.name}</span>
      </div>

      {/* Playlist embed */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${config.gradient}`}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height={platform === 'spotify' ? '352' : '400'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
          title={title}
        />
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Info section */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-main">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};
