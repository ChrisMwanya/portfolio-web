import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-5 text-secondary-foreground">{children}</div>;
};

export default Layout;
