import React from 'react';
import { Breadcrumb } from '@/components/breadcrumb';
import { Link } from '@/components/ui/link';

export const metadata = {
  title: 'Formateur - Chris Mwanya',
  description:
    'Formateur développeur web chez Kadea Academy, passionné par la transmission de connaissances',
};

export default function FormateurPage() {
  const teachingTopics = [
    {
      title: 'React & Next.js',
      description:
        'Maîtrise des concepts fondamentaux de React : composants, hooks, state management. Introduction à Next.js pour le SSR et SSG.',
      icon: 'icon-[logos--react]',
      level: 'Débutant à Avancé',
    },
    {
      title: 'Backend avec AdonisJS',
      description:
        "Développement d'APIs RESTful, authentification, gestion de base de données avec l'ORM Lucid, et bonnes pratiques backend.",
      icon: 'icon-[mdi--rocket-launch]',
      level: 'Intermédiaire',
    },
    {
      title: 'TypeScript',
      description:
        'Introduction au typage statique, interfaces, types avancés, et intégration dans les projets React/Node.js.',
      icon: 'icon-[logos--typescript-icon]',
      level: 'Débutant à Intermédiaire',
    },
    {
      title: 'Git & Collaboration',
      description:
        'Utilisation de Git pour le versioning, workflows collaboratifs, branches, merge, et bonnes pratiques en équipe.',
      icon: 'icon-[mdi--git]',
      level: 'Débutant',
    },
    {
      title: 'Tailwind CSS',
      description:
        "Design moderne avec l'approche utility-first, responsive design, dark mode, et personnalisation.",
      icon: 'icon-[logos--tailwindcss-icon]',
      level: 'Débutant à Intermédiaire',
    },
    {
      title: 'Bases de Données',
      description:
        'SQL avec PostgreSQL, conception de schémas, relations, migrations, et requêtes optimisées.',
      icon: 'icon-[mdi--database]',
      level: 'Intermédiaire',
    },
  ];

  const pedagogicalValues = [
    {
      title: 'Apprentissage par la Pratique',
      description:
        'Les apprenants construisent des projets réels dès le début pour mieux assimiler les concepts.',
      icon: 'icon-[mdi--tools]',
    },
    {
      title: 'Bienveillance & Patience',
      description:
        "Chaque apprenant progresse à son rythme. Mon rôle est d'accompagner, encourager et inspirer.",
      icon: 'icon-[mdi--heart]',
    },
    {
      title: 'Qualité du Code',
      description:
        'Enseigner les bonnes pratiques dès le départ : code propre, lisible, et maintenable.',
      icon: 'icon-[mdi--star-four-points]',
    },
    {
      title: 'Veille Continue',
      description:
        'Partager les dernières tendances et innovations pour préparer les apprenants au marché du travail.',
      icon: 'icon-[mdi--book-open-page-variant]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-blue-500/20 to-main/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-t from-main/20 to-green-500/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'Formateur', icon: 'icon-[mdi--teach]' }]}
        />

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-green-600 via-blue-600 to-main bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            <span className="icon-[mdi--teach] mr-3" />
            Formateur & Coach
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Transmettre la passion du code, une ligne à la fois
          </p>
        </header>

        {/* Experience Section */}
        <section className="mb-16">
          <div className="glass-card animate-fade-in-up rounded-2xl p-8 [animation-delay:200ms]">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Mon Parcours en Formation
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Formateur développeur chez{' '}
                <Link href="https://www.kadea.academy/" target="_blank">
                  <strong className="text-main">Kadea Academy</strong>
                </Link>
                , j&apos;accompagne des apprenants passionnés dans leur
                apprentissage du développement web. De la découverte du premier{' '}
                <code className="rounded bg-muted px-2 py-1 text-sm">
                  console.log()
                </code>{' '}
                à la mise en production d&apos;applications complexes, je suis
                là à chaque étape du parcours.
              </p>
              <p className="leading-relaxed">
                Ma philosophie ? <strong>Apprendre en faisant</strong>. Les
                meilleurs développeurs sont ceux qui ont construit, cassé, et
                reconstruit leurs projets. Mon rôle est de guider, inspirer, et
                créer un environnement où l&apos;échec est une opportunité
                d&apos;apprentissage.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                  3+
                </div>
                <div className="text-sm text-muted-foreground">
                  Années d&apos;Expérience
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-main/10 p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  Apprenants Formés
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-main/10 to-purple-500/10 p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-main">100%</div>
                <div className="text-sm text-muted-foreground">Passion</div>
              </div>
            </div>
          </div>
        </section>

        {/* Teaching Topics Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Sujets Enseignés
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teachingTopics.map((topic, index) => (
              <article
                key={index}
                className="glass-card group animate-fade-in-up overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="bg-gray-800 p-6 transition-all duration-300 hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-950">
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`${topic.icon} text-5xl text-white`} />
                    <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {topic.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {topic.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pedagogical Approach Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Approche Pédagogique
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pedagogicalValues.map((value, index) => (
              <div
                key={index}
                className="glass-card animate-fade-in-up rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="mb-4 flex items-center">
                  <span className={`${value.icon} mr-3 text-5xl text-main`} />
                  <h3 className="text-xl font-bold text-foreground">
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="animate-fade-in text-sm text-muted-foreground">
            ✨ &quot;Le meilleur moyen d&apos;apprendre, c&apos;est
            d&apos;enseigner&quot;
          </p>
        </footer>
      </div>
    </div>
  );
}
