'use client';

import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { FeedProps } from './type';
import { Pin, Dot, Heart } from 'lucide-react';

import Image from 'next/image';

import { ProfileAvatar } from '@/components/avatar';

export const Feed: React.FC<FeedProps> = ({ feed }) => {
  const dateFormated = DateTime.fromFormat(
    feed.description?.date,
    'yyyy-MM-dd',
  ).toFormat('LLL yyyy');
  const [showImage, setShowImage] = useState<boolean>(false);

  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      {feed.description.isPinned && (
        <>
          <div className="flex justify-end">
            <Pin
              fontWeight={900}
              size={'1rem'}
              className="text-muted-foreground"
            />
          </div>
          <p className="text-xs text-muted-foreground">Pinned Cheep</p>
        </>
      )}
      <div className="flex justify-end">
        <ProfileAvatar />
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{feed.description.name} ✨</h3>
          <Dot
            fontWeight={900}
            size={'2rem'}
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{dateFormated}</p>
        </div>
        <div className="my-1">
          <strong className="rounded-full bg-muted px-4 py-2 text-center text-sm font-semibold">
            {feed.description.statusIcon} {feed.description.status}
          </strong>
        </div>
        <h2 className="mt-8 text-2xl font-bold">{feed.title}</h2>
        <p>{feed.description.content}</p>
        <div className="my-10 h-full w-full">
          {feed.description.spotify ? (
            <iframe
              className="rounded-xl object-cover"
              src={feed.description.spotify}
              width="100%"
              height="352"
              title="spotify"
            ></iframe>
          ) : (
            <Image
              src={feed.description.image ?? ''}
              width={500}
              height={500}
              className="my-1 w-full cursor-pointer rounded-xl object-cover"
              alt={feed.title ?? ''}
              onClick={() => setShowImage(!showImage)}
            />
          )}
          <div className="mt-5 flex justify-start text-muted-foreground">
            <Heart />
          </div>
        </div>
      </div>
    </article>
  );
};
