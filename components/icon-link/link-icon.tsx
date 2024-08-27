import React from 'react';
import { LinkIconProps } from './index';
import Link from 'next/link';

const LinkIcon = ({ href, iconClassName, className }: LinkIconProps) => {
  return (
    <Link
      className={`hover:text-main ${className}`}
      href={href}
      target="_blank"
    >
      <span className={iconClassName} />
    </Link>
  );
};

export default LinkIcon;
