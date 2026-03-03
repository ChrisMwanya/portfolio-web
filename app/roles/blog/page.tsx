import React from 'react';
import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/markdown-parser';
import { BlogCard } from '@/components/cards/blog';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: 'Blog | Chris Mwanya',
  description: "Réflexions sur le développement, le design et l'innovation.",
};

const Blog = async () => {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-main/5 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-main/10">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-main/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-purple-500/20 to-blue-500/20 blur-3xl [animation-delay:2s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <Breadcrumb
          items={[
            { label: 'Blog Personnel', icon: 'icon-[mdi--post-outline]' },
          ]}
        />

        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-main via-purple-600 to-main bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Blog ✨
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Partage de connaissances, retours d&apos;expérience et explorations
            technologiques.
          </p>
        </header>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <div
                key={blog.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/40 py-24 text-center backdrop-blur-md dark:border-white/10 dark:bg-gray-900/40">
            <p className="text-xl font-medium text-muted-foreground">
              Aucun article pour le moment.
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">
              Revenez bientôt pour de nouveaux contenus !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
