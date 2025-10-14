import React from 'react';
import { HeaderProps } from './type';

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky left-0 right-0 top-0 z-50">
      <header className="flex w-full items-center justify-between border-b border-white/10 bg-white/70 px-2 py-4 shadow-lg backdrop-blur-xl transition-all duration-300 dark:bg-gray-900/70">
        {/* Gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-main/50 to-transparent" />
        {children}
      </header>
    </div>
  );
};

export default Header;
