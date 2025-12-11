'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialFormProps {
  onSuccess?: () => void;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    rating: 0,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit testimonial');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        role: '',
        company: '',
        rating: 0,
        message: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (success) {
    return (
      <div className="rounded-lg border border-main/20 bg-main/5 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <span className="icon-[mdi--check-circle] text-6xl text-main" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-main">
          Merci pour votre témoignage ! 🎉
        </h3>
        <p className="text-muted-foreground">
          Votre témoignage a été soumis avec succès et sera publié après
          validation.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-main hover:underline"
        >
          Soumettre un autre témoignage
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
    >
      <h3 className="text-xl font-semibold">Laisser un témoignage</h3>

      {error && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
            placeholder="jean@exemple.com"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="role"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Rôle/Relation <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          >
            <option value="">Sélectionnez...</option>
            <option value="Apprenant">Apprenant</option>
            <option value="Collègue">Collègue</option>
            <option value="Client">Client</option>
            <option value="Manager">Manager</option>
            <option value="Partenaire">Partenaire</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Entreprise/Organisation
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
            placeholder="Kadea Academy"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Évaluation <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-all',
                  star <= formData.rating
                    ? 'fill-amber-400 stroke-amber-400'
                    : 'fill-transparent stroke-gray-300 dark:stroke-gray-600',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          Votre témoignage <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          placeholder="Partagez votre expérience..."
          minLength={10}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Minimum 10 caractères
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-main px-4 py-2 font-medium text-white transition-colors hover:bg-main/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Soumettre le témoignage'}
      </button>
    </form>
  );
};
