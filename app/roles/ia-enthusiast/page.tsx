import React from 'react';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata = {
  title: 'IA Enthusiast - Chris Mwanya',
  description:
    "Passionné par l'intelligence artificielle et les technologies émergentes",
};

export default function IAEnthusiastPage() {
  const aiInterests = [
    {
      title: 'Large Language Models (LLMs)',
      description:
        "Exploration des capacités des modèles de langage comme GPT, Claude, et Gemini. Intégration d'IA dans les applications pour améliorer l'expérience utilisateur.",
      icon: 'icon-[mdi--brain]',
      applications: [
        'Chatbots intelligents',
        'Génération de contenu',
        'Assistants de code',
      ],
    },
    {
      title: 'IA Générative',
      description:
        "Fascination pour la génération d'images, de vidéos et d'audio par IA. Exploration des outils comme Midjourney, DALL-E, et Stable Diffusion.",
      icon: 'icon-[mdi--palette]',
      applications: [
        'Design assisté par IA',
        'Création de mockups',
        "Génération d'assets",
      ],
    },
    {
      title: 'IA & Développement',
      description:
        "Utilisation de l'IA pour augmenter la productivité : GitHub Copilot, code review automatisé, génération de tests, et documentation.",
      icon: 'icon-[mdi--laptop]',
      applications: [
        'Pair programming avec IA',
        'Refactoring automatisé',
        'Debugging assisté',
      ],
    },
    {
      title: 'Automatisation Intelligente',
      description:
        'Création de workflows automatisés combinant IA et logique métier pour résoudre des problèmes complexes.',
      icon: 'icon-[mdi--lightning-bolt]',
      applications: [
        'Analyse de données',
        'Classification automatique',
        'Recommandations personnalisées',
      ],
    },
  ];

  const futureVision = [
    {
      title: 'IA & Éducation',
      description:
        "L'IA peut révolutionner l'apprentissage avec des tuteurs personnalisés, des feedbacks instantanés, et des parcours adaptés à chaque apprenant.",
      icon: 'icon-[mdi--school]',
    },
    {
      title: 'IA Éthique',
      description:
        "Importance de développer et utiliser l'IA de manière responsable, transparente, et respectueuse de la vie privée.",
      icon: 'icon-[mdi--scale-balance]',
    },
    {
      title: "Démocratisation de l'IA",
      description:
        "Rendre l'IA accessible à tous, pas seulement aux grandes entreprises tech. Créer des outils simples et intuitifs.",
      icon: 'icon-[mdi--earth]',
    },
    {
      title: 'Collaboration Humain-IA',
      description:
        "L'IA ne remplace pas les humains, elle augmente nos capacités. Le futur est à la collaboration intelligente.",
      icon: 'icon-[mdi--handshake]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-pink-500/20 to-main/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-t from-main/20 to-purple-500/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'IA Enthusiast', icon: 'icon-[mdi--robot-outline]' },
          ]}
        />

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-purple-600 via-pink-600 to-main bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            <span className="icon-[mdi--robot-outline] mr-3" />
            IA Enthusiast
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Passionné par l&apos;IA et son potentiel à transformer notre monde
          </p>
        </header>

        {/* Introduction Section */}
        <section className="mb-16">
          <div className="glass-card animate-fade-in-up rounded-2xl p-8 [animation-delay:200ms]">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Pourquoi l&apos;IA ?
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Nous vivons une époque fascinante où l&apos;intelligence
                artificielle n&apos;est plus de la science-fiction, mais une
                réalité qui transforme profondément notre façon de travailler,
                d&apos;apprendre et de créer.
              </p>
              <p className="leading-relaxed">
                En tant que développeur et formateur, je suis particulièrement
                intéressé par{' '}
                <strong>comment l&apos;IA peut augmenter nos capacités</strong>{' '}
                : écrire du code plus rapidement, automatiser les tâches
                répétitives, et nous permettre de nous concentrer sur ce qui
                compte vraiment - la créativité et la résolution de problèmes
                complexes.
              </p>
              <p className="leading-relaxed">
                Mon approche ?{' '}
                <strong>Rester curieux, expérimenter constamment</strong>, et
                partager mes découvertes avec la communauté. L&apos;IA évolue à
                une vitesse folle, et la veille technologique est devenue une
                passion quotidienne.
              </p>
            </div>
          </div>
        </section>

        {/* AI Interests Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Domaines d&apos;Intérêt
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {aiInterests.map((interest, index) => (
              <article
                key={index}
                className="glass-card group animate-fade-in-up overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="bg-gray-800 p-6 transition-all duration-300 hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-950">
                  <div className="mb-2 flex items-center">
                    <span
                      className={`${interest.icon} mr-3 text-5xl text-white`}
                    />
                    <h3 className="text-xl font-bold text-white">
                      {interest.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/90">
                    {interest.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Applications pratiques :
                  </h4>
                  <ul className="space-y-2">
                    {interest.applications.map((app, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="mr-2 text-main">✓</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Vision & Réflexions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {futureVision.map((vision, index) => (
              <div
                key={index}
                className="glass-card animate-fade-in-up rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="mb-4 text-center">
                  <span className={`${vision.icon} text-5xl text-main`} />
                </div>
                <h3 className="mb-3 text-center text-lg font-bold text-foreground">
                  {vision.title}
                </h3>
                <p className="text-center text-sm leading-relaxed text-muted-foreground">
                  {vision.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="animate-fade-in text-sm text-muted-foreground">
            ✨ L&apos;IA n&apos;est pas l&apos;ennemi, c&apos;est un partenaire
            pour construire un meilleur futur
          </p>
        </footer>
      </div>
    </div>
  );
}
