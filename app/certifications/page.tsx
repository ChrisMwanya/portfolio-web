import React from 'react';
import Image from 'next/image';
import { Award, ExternalLink } from 'lucide-react';
import { Breadcrumb } from '@/components/breadcrumb';
import { getAllCertifications } from '@/lib/markdown-parser';

export const metadata = {
  title: 'Mes Certifications - Chris Mwanya',
  description:
    'Découvrez les certifications que j’ai obtenues en développement, cybersécurité et IA',
};

// "2026-05" → "mai 2026"
const formatDate = (date?: string) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });
};

export default function CertificationsPage() {
  const certifications = getAllCertifications();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-gray-950 dark:via-gray-900 dark:to-neutral-900">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-main/20 to-neutral-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-neutral-500/20 to-main/20 blur-3xl [animation-delay:2s]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: '🏅 Mes Certifications' }]} />

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-main via-neutral-600 to-neutral-800 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            🏅 Mes Certifications
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Les certifications qui valident mon parcours en développement,
            cybersécurité et IA
          </p>
        </header>

        {certifications.length === 0 ? (
          // Empty state
          <div className="glass-card mx-auto max-w-md animate-fade-in-up rounded-2xl p-10 text-center">
            <Award className="mx-auto mb-4 h-12 w-12 text-main opacity-60" />
            <p className="text-muted-foreground">
              Les certifications arrivent bientôt ✨
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((certification, index) => {
              const date = formatDate(certification.date);
              const expiration = formatDate(certification.expiration);

              return (
                <article
                  key={certification.id}
                  className={`stagger-${(index % 5) + 1} glass-card group flex animate-fade-in-up flex-col rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 flex items-start gap-4">
                    {/* Badge */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-main/10 dark:bg-main/20">
                      {certification.image ? (
                        <Image
                          src={certification.image}
                          alt={`Badge ${certification.title}`}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <Award className="h-8 w-8 text-main" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-main">
                        {certification.title}
                      </h2>
                      <p className="text-sm font-medium text-muted-foreground">
                        {certification.issuer}
                      </p>
                      {date && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Obtenue en {date}
                          {expiration && ` · Expire en ${expiration}`}
                        </p>
                      )}
                    </div>
                  </div>

                  {certification.description && (
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {certification.description}
                    </p>
                  )}

                  {certification.skills && certification.skills.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {certification.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main dark:bg-main/20 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {(certification.link || certification.credentialId) && (
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 dark:border-white/10">
                      {certification.credentialId && (
                        <span className="truncate text-xs text-muted-foreground">
                          ID : {certification.credentialId}
                        </span>
                      )}
                      {certification.link && (
                        <a
                          href={certification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-2 rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main transition-all hover:scale-105 hover:bg-main/20 dark:bg-main/20 dark:text-neutral-300"
                        >
                          Voir le certificat{' '}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
