import React from 'react';
import { FeedProps } from './type';
import { Pin, Dot, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export const Feed: React.FC<FeedProps> = ({ feed }) => {
  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      {feed.isPinned && (
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
        <Avatar>
          <AvatarImage src={feed.avatarLink} className="object-cover" />
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{feed.name} ✨</h3>
          <Dot
            fontWeight={900}
            size={'2rem'}
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{feed.date}</p>
        </div>
        <div className="my-1">
          <strong className="rounded-full bg-muted px-4 py-2 text-center text-sm font-semibold">
            {feed.statusIcon} {feed.status}
          </strong>
        </div>
        <h2 className="mt-8 text-2xl font-bold">{feed.title}</h2>
        <p>{feed.content}</p>
        <div className="my-10 h-full w-full">
          {feed.video ? (
            <video
              controls
              className="w-full rounded-xl object-cover"
              poster={feed.posterVideo}
              muted
            >
              <source src={feed.video} type="video/mp4" />
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={feed.image || ''}
              width={300}
              height={500}
              className="my-1 rounded-xl object-cover"
              alt={feed.title}
              layout="responsive"
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
