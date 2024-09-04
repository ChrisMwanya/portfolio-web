import React from 'react';
import type { AvatarProps } from './type';
import Image from 'next/image';
import {
  Avatar as Profile,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const Avatar = ({ imageUrl, className, altText }: AvatarProps) => {
  return (
    <div className={`z-0 ${className}`}>
      <Image
        src={imageUrl ?? ''}
        className="h-full w-full rounded-full object-cover"
        alt={altText}
      />
    </div>
  );
};

export const ProfileAvatar = () => {
  return (
    <Profile>
      <AvatarImage
        src={'/assets/images/profil.webp'}
        className="object-cover"
      />
      <AvatarFallback>CM</AvatarFallback>
    </Profile>
  );
};

export default Avatar;
