import React from 'react';

import '@/styles/globals.css';
import { ThemeProvider } from '@/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FloatingCTA } from '@/components/floating-cta';

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
          {children}
          <FloatingCTA />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
