import React from 'react';
import { HeaderProps } from './type';

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="sticky left-0 right-0 top-0 z-50">
      <header className="flex w-full items-center justify-between px-6 py-4 backdrop-blur-sm">
        {children}
      </header>
    </div>
  );
};

export default Header;
