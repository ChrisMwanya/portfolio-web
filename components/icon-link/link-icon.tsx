import React from 'react';
import { LinkIconProps } from './index';
import Link from 'next/link';

const LinkIcon = ({ href, iconClassName, className }: LinkIconProps) => {
  return (
    <Link
      className={`border-b-4 border-transparent hover:border-main ${className}`}
      href={href}
      target="_blank"
    >
      <span className={iconClassName} />
    </Link>
  );
};

export default LinkIcon;
