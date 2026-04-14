'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import type { Blog } from '@/lib/markdown-parser';

export const BlogCard: React.FC<Blog> = (blog) => {
  const dateFormatted = blog.date
    ? DateTime.fromISO(blog.date).toFormat('dd LLL yyyy')
    : 'Date inconnue';

  return (
    <Link href={`/roles/blog/${blog.slug}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-gray-900/60 dark:hover:bg-gray-900/70">
        {/* Gradient glow effect on hover */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-main/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.image || '/assets/images/ford-model-t.png'}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main dark:bg-main/20 dark:text-amber-400"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} className="text-main" />
            <span>{dateFormatted}</span>
          </div>

          <h3 className="mb-3 text-xl font-bold leading-tight transition-colors group-hover:text-main">
            {blog.title}
          </h3>

          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {blog.description}
          </p>

          <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-main transition-all group-hover:gap-3">
            Lire l&apos;article
            <ArrowRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  );
};
