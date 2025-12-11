import React from 'react';
import { Breadcrumb } from '@/components/breadcrumb';
import { Link } from '@/components/ui/link';
import { getAllProjects } from '@/lib/markdown-parser';
import { ProjectComponent } from '@/components/cards/project';

export const metadata = {
  title: 'Développeur Fullstack - Chris Mwanya',
  description:
    'Expertise en développement web fullstack : React, Node.js, TypeScript, et bien plus',
};

export default function DeveloppeurFullstackPage() {
  const projects = getAllProjects();

  const techStack = {
    Frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    Backend: ['Node.js', 'AdonisJS', 'Express.js', 'PostgreSQL', 'Redis'],
    DevOps: ['Docker', 'Git', 'CI/CD', 'Vercel', 'Railway'],
    CMS: ['Strapi', 'WordPress', 'Notion API'],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-l from-purple-500/20 to-main/20 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 animate-float rounded-full bg-gradient-to-t from-main/20 to-blue-500/20 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: 'Développeur Fullstack',
              icon: 'icon-[mdi--code-braces]',
            },
          ]}
        />

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 animate-fade-in-up bg-gradient-to-r from-blue-600 via-main to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            <span className="icon-[mdi--code-braces] mr-3" />
            Développeur Fullstack
          </h1>
          <p className="animate-fade-in-up text-lg text-muted-foreground [animation-delay:100ms]">
            Passionné par la création d&apos;applications web performantes et
            intuitives
          </p>
        </header>

        {/* Experience Section */}
        <section className="mb-16">
          <div className="glass-card animate-fade-in-up rounded-2xl p-8 [animation-delay:200ms]">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Mon Parcours
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Depuis <strong className="text-main">2021</strong>, je crée des
                applications web modernes en utilisant les technologies les plus
                récentes. Mon expertise couvre l&apos;ensemble du développement
                fullstack, de la conception d&apos;interfaces utilisateur
                réactives à la construction d&apos;APIs robustes et scalables.
              </p>
              <p className="leading-relaxed">
                Actuellement formateur développeur chez{' '}
                <Link href="https://www.kadea.academy/" target="_blank">
                  Kadea Academy
                </Link>
                , je combine ma passion pour le code avec celle de la
                transmission de connaissances, ce qui me permet de rester à la
                pointe des meilleures pratiques du développement web.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Projets Réalisés
          </h2>
          <div className="gap-y-4">
            {projects?.map(
              (
                { title, description, link, image, imageAlt, technos },
                index,
              ) => {
                const staggerClass = `stagger-${Math.min(index + 1, 5)}`;
                return (
                  <div
                    key={title ?? undefined}
                    className={`animate-fade-in-up ${staggerClass}`}
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <ProjectComponent
                      title={title ?? null}
                      description={description ?? null}
                      link={link ?? null}
                      image={image}
                      imageAlt={imageAlt}
                      technos={technos}
                    />
                  </div>
                );
              },
            )}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Stack Technique
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(techStack).map(
              ([category, technologies], index) => (
                <div
                  key={category}
                  className="glass-card animate-fade-in-up rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <h3 className="mb-4 text-lg font-bold text-main">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {technologies.map((tech, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="mr-2 text-main">▸</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-16 text-center">
          <p className="animate-fade-in text-sm text-muted-foreground">
            ✨ Toujours en quête de nouveaux défis et d&apos;apprentissage
            continu
          </p>
        </footer>
      </div>
    </div>
  );
}
