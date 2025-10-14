'use client';
import React from 'react';
import type { MenuItemProps } from './type';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

const MenuItem: React.FC<MenuItemProps> = ({ title, href }) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  const activeClassName = isActive
    ? 'border-main text-foreground font-bold'
    : 'border-transparent';

  return (
    <Link
      href={href}
      className={`group relative w-full flex-shrink-0 flex-grow basis-0 cursor-pointer overflow-hidden rounded-lg py-4 text-center text-muted-foreground transition-all duration-300 hover:bg-white/40 hover:shadow-md hover:backdrop-blur-md dark:hover:bg-white/5`}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-main/10 to-transparent transition-transform duration-300 group-hover:translate-y-0" />

      <span
        className={`relative z-10 border-b-4 pb-2 transition-colors ${activeClassName} ${isActive ? 'text-main' : 'group-hover:text-main'}`}
      >
        {title}
      </span>
    </Link>
  );
};

export default MenuItem;
