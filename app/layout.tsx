import React from 'react';

import Header from '@/components/header/header';
import Logo from '@/components/logo/logo';
import { ModeToggle } from '@/components/mode-toggle';
import NextLink from 'next/link';
import '@/styles/globals.css';
import { ThemeProvider } from '@/theme-provider';
import Avatar from '@/components/avatar/avatar';
import TitleH1 from '@/components/ui/title-h1';
import { Avatar as AvatarIcon, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@/components/ui/link';
import { CustomButtonLink } from '@/components/custom-button/custom-button';
import ListItemIcon from '@/components/list-item-icon/list-item-icon';
import LinkIcon from '@/components/icon-link/link-icon';
import Stacks from '@/components/stacks/stacks';
import { Navbar } from '@/components/navbar/navbar';
import { menuItems } from '@/config/menu';
import Footer from '@/components/footer/footer';

import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: React.PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative overflow-hidden bg-[url('../public/assets/logo-black.svg')] bg-30 bg-fixed bg-[80%_100%] bg-no-repeat dark:bg-[url('../public/assets/logo-white.svg')] max-md:bg-[100%_100%] max-sm:bg-50">
            {/* Animated gradient background */}
            <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-main/5 via-purple-500/5 to-amber-500/5 opacity-50" />
            <div className="absolute inset-0 bg-background opacity-95" />

            {/* Floating orbs for depth */}
            <div className="pointer-events-none absolute left-1/4 top-20 h-64 w-64 animate-float rounded-full bg-main/10 blur-3xl" />
            <div
              className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-purple-500/10 blur-3xl"
              style={{ animationDelay: '2s' }}
            />

            <div className="relative z-0 p-0">
              <Header>
                <NextLink href="/">
                  <Logo
                    color={{ primary: '', secondary: 'text-main' }}
                    height="3rem"
                    width="3rem"
                  />
                </NextLink>
                <div className="flex items-center gap-3">
                  <LinkIcon
                    href="mailto:cmwanya@gmail.com"
                    iconClassName="icon-[fluent--mail-edit-32-filled] text-2xl"
                  />
                  <LinkIcon
                    href="https://wa.me/+243906920283"
                    iconClassName="icon-[ri--whatsapp-fill] text-2xl"
                  />
                  <ModeToggle />
                </div>
              </Header>
              <div className="lg:container max-sm:px-2 lg:px-96">
                <div>
                  <div className="min-sm:h-20 relative size-full h-48 overflow-hidden bg-[url('/assets/images/fordT.webp')] bg-cover bg-center bg-no-repeat max-md:h-20">
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
                  </div>
                  <div className="flex animate-fade-in justify-between p-5 max-sm:px-0">
                    <div className="group relative transition-transform duration-300 hover:scale-105">
                      <Avatar
                        // altText="Avatar Christian"
                        className="-mt-20 h-44 w-44 rounded-full border-4 border-main shadow-2xl transition-all duration-300 group-hover:border-amber-600 max-sm:-mt-9 max-sm:h-36 max-sm:w-36"
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 -z-10 -mt-20 h-44 w-44 rounded-full bg-main/30 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 max-sm:-mt-9 max-sm:h-36 max-sm:w-36" />
                    </div>
                    <div className="animate-fade-in-up">
                      <CustomButtonLink
                        href="https://www.linkedin.com/in/christianmwanya/"
                        target="_blank"
                      >
                        <p> Suivre</p>
                        <span className="icon-[pajamas--linkedin] text-xl" />
                      </CustomButtonLink>
                    </div>
                  </div>

                  <div className="mt-3">
                    <TitleH1>
                      <div className="flex animate-fade-in-up items-center">
                        <span className="bg-gradient-to-r from-main via-amber-600 to-main bg-clip-text text-transparent transition-all duration-500 hover:from-amber-600 hover:via-main hover:to-amber-600">
                          Chris Mwanya
                        </span>
                        <LinkIcon
                          href="https://github.com/ChrisMwanya"
                          iconClassName="icon-[bi--github] text-2xl transition-all duration-300 hover:scale-125 hover:rotate-12"
                          className="mx-5"
                        />
                        <div className="animate-float">
                          <AvatarIcon className="bg-main shadow-lg ring-2 ring-main/20 transition-all duration-300 hover:scale-110 hover:ring-4">
                            <AvatarImage src="/assets/images/ford-model-t.png" />
                          </AvatarIcon>
                        </div>
                      </div>
                    </TitleH1>
                    <div className="my-2 animate-fade-in-up">
                      <p className="mb-3 text-sm">
                        Pas seulement partager des connaissances et des
                        solutions, mais partager{' '}
                        <strong className="animate-pulse font-semibold text-main">
                          la passion
                        </strong>
                        ✨
                      </p>
                      <p className="my-1">
                        Développeur Fullstack. Formateur. Humain. Aime partager
                        ses connaissances <br />
                        Actuellement formateur développeur chez{' '}
                        <Link href="https://www.kadea.academy/" target="_blank">
                          kadea academy
                        </Link>
                      </p>{' '}
                      <div>
                        <Stacks className="flex flex-wrap gap-2" />
                      </div>
                      <div className="my-4 flex flex-wrap items-center gap-6">
                        <ListItemIcon iconClassName="icon-[ic--round-home-work]">
                          Disponible
                        </ListItemIcon>
                        <ListItemIcon iconClassName="icon-[ph--link-bold]">
                          <Link
                            href="https://linktr.ee/chrismwanya"
                            target="_blank"
                          >
                            /Liens
                          </Link>
                        </ListItemIcon>
                        <ListItemIcon iconClassName="icon-[jam--birthday-cake]">
                          13 Déc
                        </ListItemIcon>
                        <ListItemIcon iconClassName="icon-[majesticons--calendar]">
                          Depuis 2021
                        </ListItemIcon>
                        <ListItemIcon iconClassName="icon-[ic--baseline-place]">
                          Kinshasa, RDC
                        </ListItemIcon>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-10">
                  <Navbar menuItems={menuItems} />
                </div>
                {children}

                <Footer />
                <Toaster />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
