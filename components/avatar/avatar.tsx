import React from 'react';
import type { AvatarProps } from './type';

import {
  Avatar as Profile,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const Avatar = ({ className }: AvatarProps) => {
  return (
    <div className={`z-0 ${className}`}>
      <ProfileAvatar className="h-full w-full" />
    </div>
  );
};

export const ProfileAvatar = ({ className }: { className?: string }) => {
  return (
    <Profile className={className}>
      <AvatarImage
        src={'/assets/images/profil.webp'}
        className="object-cover"
        sizes="lg"
      />
      <AvatarFallback>CM</AvatarFallback>
    </Profile>
  );
};

export default Avatar;
