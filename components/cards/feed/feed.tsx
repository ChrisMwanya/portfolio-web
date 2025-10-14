'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Pin, Dot, Heart, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileAvatar } from '@/components/avatar';
import { Feed as FeedType } from './type';

export const Feed: React.FC<FeedType> = (feed) => {
  const dateFormated = feed.content?.date
    ? DateTime.fromFormat(feed.content.date, 'yyyy-MM-dd').toFormat('LLL yyyy')
    : 'Date inconnue';

  const [showImage, setShowImage] = useState<boolean>(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImage) {
        setShowImage(false);
      }
    };

    if (showImage) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showImage]);

  return (
    <>
      <article className="group relative mb-6 grid animate-fade-in grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-xl border border-white/20 bg-white/60 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-900/70">
        {/* Gradient glow effect on hover */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-main/10 via-purple-500/10 to-main/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        {feed?.content?.isPinned && (
          <>
            <div className="flex justify-end">
              <Pin
                fontWeight={900}
                size={'1rem'}
                className="text-main transition-transform group-hover:rotate-12"
              />
            </div>
            <p className="text-xs font-medium text-main">📌 Pinned Cheep</p>
          </>
        )}
        <div className="flex justify-end">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <ProfileAvatar />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold transition-colors group-hover:text-main">
              {feed?.content?.name} ✨
            </h3>
            <Dot
              fontWeight={900}
              size={'2rem'}
              className="text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">{dateFormated}</p>
          </div>
          <div className="my-1">
            <strong className="inline-block rounded-full bg-main/10 px-4 py-2 text-center text-sm font-semibold text-main backdrop-blur-sm transition-all hover:scale-105 dark:bg-main/20 dark:text-amber-400">
              {feed.content?.statusIcon} {feed.content?.status}
            </strong>
          </div>
          <h2 className="mt-8 text-2xl font-bold transition-colors group-hover:bg-gradient-to-r group-hover:from-main group-hover:via-amber-600 group-hover:to-main group-hover:bg-clip-text group-hover:text-transparent">
            {feed.title}
          </h2>
          <p className="mt-3 leading-relaxed">{feed.content?.content}</p>
          <div className="my-10 h-full w-full">
            {feed.content?.spotify ? (
              <Link
                href="/playlists"
                className="group/spotify relative block overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Overlay with click hint */}
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/spotify:bg-black/30 group-hover/spotify:opacity-100">
                  <div className="rounded-full bg-white/90 px-6 py-3 backdrop-blur-sm dark:bg-gray-900/90">
                    <p className="text-sm font-semibold text-main">
                      🎵 Voir toutes mes playlists
                    </p>
                  </div>
                </div>
                <iframe
                  className="pointer-events-none rounded-xl object-cover shadow-lg transition-shadow group-hover/spotify:shadow-2xl"
                  src={feed.content?.spotify}
                  width="100%"
                  height="352"
                  title="spotify"
                ></iframe>
              </Link>
            ) : (
              <div
                className="group/image relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setShowImage(true)}
              >
                <Image
                  src={feed.content?.image ?? ''}
                  width={500}
                  height={500}
                  className="my-1 w-full rounded-xl object-cover transition-transform duration-500 group-hover/image:scale-105"
                  alt={feed.title ?? ''}
                />
                {/* Zoom indicator */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/image:bg-black/20 group-hover/image:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm dark:bg-gray-900/90">
                    <ZoomIn className="h-6 w-6 text-main" />
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 flex justify-start text-muted-foreground">
              <Heart className="cursor-pointer transition-all duration-300 hover:scale-125 hover:fill-red-500 hover:text-red-500" />
            </div>
          </div>
        </div>
      </article>

      {/* Image Modal/Lightbox */}
      {showImage && feed.content?.image && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          onClick={() => setShowImage(false)}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
            onClick={() => setShowImage(false)}
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={feed.content.image}
              width={1200}
              height={800}
              className="h-auto max-h-[90vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              alt={feed.title ?? ''}
              priority
            />

            {/* Image caption */}
            {feed.title && (
              <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent p-6 text-white backdrop-blur-sm">
                <p className="text-lg font-semibold">{feed.title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
