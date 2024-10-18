import { Home } from '@/components/home/home';

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
const Index = () => <Home />;

export default Index;
