'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { sidebarMenuItems } from '@/config/menu';
import { usePathname } from 'next/navigation';
import Logo from '@/components/logo/logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[40%] transform border-r border-white/10 bg-white/90 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out dark:bg-gray-900/90 max-sm:w-72 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Gradient accent line */}
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-main/50 to-transparent" />

        <nav className="flex h-full flex-col px-6 py-20">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo
              color={{ primary: '', secondary: 'text-main' }}
              height="6rem"
              width="6rem"
            />
          </div>

          <div className="mb-8">
            <h2 className="bg-gradient-to-r from-main via-amber-600 to-main bg-clip-text text-2xl font-bold text-transparent">
              Navigation
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-main to-amber-600" />
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 space-y-2">
            {sidebarMenuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li
                  key={item.href}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 hover:bg-main/10 ${
                      isActive ? 'bg-main/20 text-main' : 'text-foreground'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 h-8 w-1 rounded-r-full bg-gradient-to-b from-main to-amber-600" />
                    )}

                    {/* Icon */}
                    {item.icon && (
                      <span
                        className={`${item.icon} text-xl transition-all duration-300 ${
                          isActive ? 'text-main' : 'text-muted-foreground'
                        }`}
                      />
                    )}

                    {/* Link text */}
                    <span
                      className={`font-medium transition-all duration-300 group-hover:translate-x-1 ${
                        isActive ? 'text-main' : ''
                      }`}
                    >
                      {item.title}
                    </span>

                    {/* Hover arrow */}
                    <span
                      className={`ml-auto transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100`}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer info */}
          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-sm text-muted-foreground">Chris Mwanya</p>
            <p className="mt-1 text-xs text-muted-foreground">
              © 2024 Tous droits réservés
            </p>
          </div>
        </nav>
      </aside>
    </>
  );
};
