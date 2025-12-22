'use client';

import React, { useState } from 'react';
import Header from '@/components/header/header';
import { BurgerMenu } from '@/components/burger-menu';
import { Sidebar } from '@/components/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export default function MinimalLayout({ children }: MinimalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="relative overflow-hidden bg-[url('/assets/logo-black.svg')] bg-30 bg-fixed bg-[80%_100%] bg-no-repeat dark:bg-[url('/assets/logo-white.svg')] max-md:bg-[100%_100%] max-sm:bg-50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-xy bg-gradient-to-br from-main/5 via-purple-500/5 to-amber-500/5 opacity-50" />
      <div className="absolute inset-0 bg-background opacity-95" />

      {/* Floating orbs for depth */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-64 w-64 animate-float rounded-full bg-main/10 blur-3xl" />
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-purple-500/10 blur-3xl"
        style={{ animationDelay: '2s' }}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="relative z-0 p-0">
        <Header>
          <BurgerMenu
            isOpen={isSidebarOpen}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </Header>
        <main className="pt-20">{children}</main>
      </div>
    </div>
  );
}
