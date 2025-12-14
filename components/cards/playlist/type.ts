export type PlaylistType = {
  id?: string;
  title: string;
  description?: string;
  platform: 'spotify' | 'youtube';
  embedUrl: string;
  thumbnail?: string;
};
