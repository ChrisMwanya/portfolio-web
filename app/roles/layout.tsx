import React from 'react';
import Header from '@/components/header/header';
import Logo from '@/components/logo/logo';
import { ModeToggle } from '@/components/mode-toggle';
import NextLink from 'next/link';

interface RolesLayoutProps {
  children: React.ReactNode;
}

export default function RolesLayout({ children }: RolesLayoutProps) {
  return (
    <div className="min-h-screen">
      <Header>
        <NextLink href="/">
          <Logo
            color={{ primary: '', secondary: 'text-main' }}
            height="3rem"
            width="3rem"
          />
        </NextLink>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </Header>
      <main className="pt-20">{children}</main>
    </div>
  );
}
