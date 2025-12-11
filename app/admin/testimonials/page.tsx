'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Star, Check, X, Loader2, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types/testimonial';

type TabType = 'pending' | 'approved';

export default function AdminTestimonialsPage() {
  const { status } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [pendingTestimonials, setPendingTestimonials] = useState<Testimonial[]>(
    [],
  );
  const [approvedTestimonials, setApprovedTestimonials] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials/admin');
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Non autorisé');
        }
        throw new Error('Échec de la récupération des témoignages');
      }
      const data = await response.json();
      setPendingTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) {
        throw new Error('Échec de la récupération');
      }
      const data = await response.json();
      setApprovedTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPendingTestimonials();
      fetchApprovedTestimonials();
    } else if (status === 'unauthenticated') {
      setLoading(false);
      setError('Vous devez être connecté pour accéder à cette page');
    }
  }, [status]);

  const handleAction = async (
    id: string,
    action: 'approve' | 'reject' | 'disable' | 'setPriority',
    priority?: number,
  ) => {
    setProcessingId(id);
    setError(null);

    try {
      const response = await fetch('/api/testimonials/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action, priority }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de l'action");
      }

      // Refresh lists
      await fetchPendingTestimonials();
      await fetchApprovedTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setProcessingId(null);
    }
  };

  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-main" />
        <p className="mt-4 text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  // Not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <span className="icon-[mdi--lock] mb-4 text-6xl text-red-500" />
          <h1 className="mb-2 text-2xl font-bold">Accès refusé</h1>
          <p className="text-muted-foreground">
            Vous devez être connecté en tant qu&apos;administrateur pour accéder
            à cette page.
          </p>
        </div>
      </div>
    );
  }

  const displayTestimonials =
    activeTab === 'pending' ? pendingTestimonials : approvedTestimonials;

  return (
    <div className="container mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Gestion des Témoignages</h1>
        <p className="text-muted-foreground">
          Gérez les témoignages en attente et approuvés
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('pending')}
          className={cn(
            'border-b-2 px-4 py-2 font-medium transition-colors',
            activeTab === 'pending'
              ? 'border-main text-main'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          )}
        >
          En attente ({pendingTestimonials.length})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={cn(
            'border-b-2 px-4 py-2 font-medium transition-colors',
            activeTab === 'approved'
              ? 'border-main text-main'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          )}
        >
          Approuvés ({approvedTestimonials.length})
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 rounded-md border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Testimonials list */}
      {displayTestimonials.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
          <span className="icon-[mdi--check-all] mb-4 text-6xl text-muted-foreground" />
          <p className="text-lg font-semibold">
            {activeTab === 'pending'
              ? 'Aucun témoignage en attente'
              : 'Aucun témoignage approuvé'}
          </p>
          <p className="text-sm text-muted-foreground">
            {activeTab === 'pending'
              ? 'Tous les témoignages ont été traités'
              : 'Aucun témoignage approuvé pour le moment'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-main to-amber-600 font-semibold text-white">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` • ${testimonial.company}`}
                    </p>
                  </div>
                </div>

                {/* Rating */}
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

              {/* Message */}
              <blockquote className="mb-4 rounded-md bg-muted/50 p-4 italic">
                &ldquo;{testimonial.message}&rdquo;
              </blockquote>

              {/* Date and actions */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-m uted-foreground text-xs">
                    Soumis le{' '}
                    {new Intl.DateTimeFormat('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(testimonial.date))}
                  </p>
                </div>

                {activeTab === 'approved' && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">
                      Priorité:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={testimonial.priority || 0}
                      onChange={(e) => {
                        const newPriority = parseInt(e.target.value) || 0;
                        handleAction(
                          testimonial.id,
                          'setPriority',
                          newPriority,
                        );
                      }}
                      className="w-16 rounded border border-input bg-background px-2 py-1 text-xs"
                    />
                    <span className="text-xs text-muted-foreground">
                      (Plus élevée = affichée en premier)
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  {activeTab === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAction(testimonial.id, 'approve')}
                        disabled={processingId === testimonial.id}
                        className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {processingId === testimonial.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        Approuver
                      </button>

                      <button
                        onClick={() => handleAction(testimonial.id, 'reject')}
                        disabled={processingId === testimonial.id}
                        className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {processingId === testimonial.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        Rejeter
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAction(testimonial.id, 'disable')}
                      disabled={processingId === testimonial.id}
                      className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {processingId === testimonial.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                      Retirer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
