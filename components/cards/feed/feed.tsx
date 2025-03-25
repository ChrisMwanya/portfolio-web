'use client';

import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Pin, Dot, Heart } from 'lucide-react';
import Image from 'next/image';
import { ProfileAvatar } from '@/components/avatar';
import { Feed as FeedType } from './type';

export const Feed: React.FC<FeedType> = (feed) => {
  const dateFormated = feed.content?.date
    ? DateTime.fromFormat(feed.content.date, 'yyyy-MM-dd').toFormat('LLL yyyy')
    : 'Date inconnue';

  const [showImage, setShowImage] = useState<boolean>(false);

  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      {feed?.content?.isPinned && (
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
          <h3 className="text-lg font-semibold">{feed?.content?.name} ✨</h3>
          <Dot
            fontWeight={900}
            size={'2rem'}
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{dateFormated}</p>
        </div>
        <div className="my-1">
          <strong className="rounded-full bg-muted px-4 py-2 text-center text-sm font-semibold">
            {feed.content?.statusIcon} {feed.content?.status}
          </strong>
        </div>
        <h2 className="mt-8 text-2xl font-bold">{feed.title}</h2>
        <p>{feed.content?.content}</p>
        <div className="my-10 h-full w-full">
          {feed.content?.spotify ? (
            <iframe
              className="rounded-xl object-cover"
              src={feed.content?.spotify}
              width="100%"
              height="352"
              title="spotify"
            ></iframe>
          ) : (
            <Image
              src={feed.content?.image ?? ''}
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
