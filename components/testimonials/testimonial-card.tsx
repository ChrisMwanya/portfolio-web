'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  // Generate initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <article className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:border-main/30 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-main to-amber-600 font-semibold text-white shadow-lg transition-transform group-hover:scale-105">
            {getInitials(testimonial.name)}
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
              {testimonial.company && ` • ${testimonial.company}`}
            </p>
          </div>
        </div>

        {/* Rating stars */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'h-4 w-4',
                star <= testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600',
              )}
            />
          ))}
        </div>
      </div>

      <blockquote className="mb-4 italic leading-relaxed text-foreground/90">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>

      {/* Date */}
      <p className="text-xs text-muted-foreground">
        {formatDate(testimonial.date)}
      </p>
    </article>
  );
};
