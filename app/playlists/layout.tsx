import React from 'react';
import Header from '@/components/header/header';
import Logo from '@/components/logo/logo';
import { ModeToggle } from '@/components/mode-toggle';
import NextLink from 'next/link';
import LinkIcon from '@/components/icon-link/link-icon';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export default function MinimalLayout({ children }: MinimalLayoutProps) {
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
      <main className="pt-20">{children}</main>
    </div>
  );
}
