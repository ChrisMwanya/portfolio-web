import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { DateTime } from 'luxon';
import { Calendar, Tag, Clock, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBlogBySlug, getAllBlogs } from '@/lib/markdown-parser';
import { Breadcrumb } from '@/components/breadcrumb';

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article non trouvé' };

  return {
    title: `${blog.title} | Chris Mwanya`,
    description: blog.description,
  };
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const dateFormatted = blog.date
    ? DateTime.fromISO(blog.date).toFormat('dd LLLL yyyy')
    : 'Date inconnue';

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gradient-to-br from-main/5 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-main/10">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-main/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-purple-500/20 to-blue-500/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-t from-blue-500/20 to-main/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Blog Personnel',
              icon: 'icon-[mdi--post-outline]',
              href: '/roles/blog',
            },
            { label: blog.title, icon: 'icon-[mdi--text-box-outline]' },
          ]}
        />

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-main/10 px-3 py-1 text-xs font-semibold text-main dark:bg-main/20 dark:text-amber-400"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-6 animate-fade-in-up bg-gradient-to-r from-main via-purple-600 to-main bg-clip-text text-4xl font-black text-transparent md:text-6xl">
            {blog.title}
          </h1>

          <div className="flex animate-fade-in-up flex-wrap justify-center gap-6 text-sm text-muted-foreground [animation-delay:100ms]">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-main" />
              <span>{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-main" />
              <span>{readingTime} min de lecture</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="relative mb-16 aspect-video w-full animate-fade-in-up overflow-hidden rounded-3xl border border-white/20 shadow-2xl [animation-delay:200ms] dark:border-white/10">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Main Content Component */}
        <div className="glass-card animate-fade-in-up rounded-3xl p-8 [animation-delay:300ms] md:p-12">
          <div className="prose-main prose prose-lg max-w-none dark:prose-invert">
            <div className="leading-relaxed text-foreground/90">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer Note / Next Step */}
        <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-main/10 px-6 py-3 text-main dark:bg-main/20">
            <BookOpen size={20} />
            <span className="font-medium">Bonne lecture !</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetail;
