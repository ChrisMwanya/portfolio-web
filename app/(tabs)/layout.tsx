import React, { PropsWithChildren } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chris Mwanya',
  description:
    "Développeur Fullstack. Formateur. Humain. J'aime partager mes connaissances",
};
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-5 text-secondary-foreground">{children}</div>;
};

export default Layout;
