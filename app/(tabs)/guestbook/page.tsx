'use client';

import React, { useState, useEffect } from 'react';
import { TestimonialForm } from '@/components/testimonials/testimonial-form';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';
import type { Testimonial } from '@/lib/types/testimonial';

const GuestBook = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSuccess = () => {
    // Optionally refresh testimonials (won't show new ones until approved)
    fetchTestimonials();
    // Hide form after successful submission
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-main via-amber-600 to-main bg-clip-text text-4xl font-bold text-transparent">
            Livre d&apos;Or
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 text-main underline-offset-4 transition-all hover:underline"
            >
              <span className="icon-[mdi--plus-circle] text-xl" />
              <span>Laisser un témoignage</span>
            </button>
          )}
        </div>
        <p className="text-muted-foreground">
          Partagez votre expérience de travail avec moi
        </p>
      </div>

      {/* Form (when shown) */}
      {showForm && (
        <div className="mx-auto max-w-2xl space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Nouveau témoignage</h2>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Fermer le formulaire"
            >
              <span className="icon-[mdi--close] text-2xl" />
            </button>
          </div>
          <TestimonialForm onSuccess={handleSuccess} />
        </div>
      )}

      {/* Testimonials Display */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold">
          Témoignages ({testimonials.length})
        </h2>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-main border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">
              Chargement des témoignages...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && testimonials.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
            <span className="icon-[mdi--message-text-outline] mb-4 text-6xl text-muted-foreground" />
            <p className="text-muted-foreground">
              Aucun témoignage pour le moment. Soyez le premier à partager votre
              expérience !
            </p>
          </div>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div className="mx-auto max-w-3xl space-y-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestBook;
