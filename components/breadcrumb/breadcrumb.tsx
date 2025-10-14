'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbProps } from './type';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-main"
      >
        <Home className="h-4 w-4" />
        <span>Accueil</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-main"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-main">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
