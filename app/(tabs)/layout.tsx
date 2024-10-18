import React, { PropsWithChildren } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chris Mwanya',
  description: 'Fullstack Developer. Trainer. Human. Love sharing knowledge',
  metadataBase: new URL(`${process.env.VERCEL_URL}`),
  openGraph: {
    images: ['/assets/images/fordT.webp'],
    title: 'Chris Mwanya',
    description: 'Fullstack Developer. Trainer. Human. Love sharing knowledge',
    url: `${process.env.VERCEL_URL}`,
    siteName: 'Chris Mwanya',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Mwanya',
    description: 'Fullstack Developer. Trainer. Human. Love sharing knowledge',
    images: '/assets/images/fordT.webp',
  },
};
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-5 text-secondary-foreground">{children}</div>;
};

export default Layout;
