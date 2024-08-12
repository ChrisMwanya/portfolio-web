import React from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps {
  // Add any additional props or customizations here
  children: React.ReactElement | string;
  target?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target,
  ...rest
}) => {
  return (
    <NextLink
      href={href}
      {...rest}
      target={target}
      className="border-b-4 border-background font-normal text-main hover:border-main"
    >
      {children}
    </NextLink>
  );
};
