import { Home } from '@/components/home/home';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chris Mwanya',
  description: 'Fullstack Developer. Trainer. Human. Love sharing knowledge',

  openGraph: {
    images: [
      'https://res.cloudinary.com/chrismwanya/image/upload/v1726043988/portfolio_assets/ford_t.webp',
    ],
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
    images:
      'https://res.cloudinary.com/chrismwanya/image/upload/v1726043988/portfolio_assets/ford_t.webp',
  },
};
const Index = () => <Home />;

export default Index;
