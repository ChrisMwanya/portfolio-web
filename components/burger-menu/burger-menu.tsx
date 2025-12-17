'use client';

import React from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-all duration-300 hover:bg-main/10"
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      {/* Top line */}
      <span
        className={`h-0.5 w-6 transform bg-foreground transition-all duration-300 ${
          isOpen ? 'translate-y-2 rotate-45' : ''
        }`}
      />
      {/* Middle line */}
      <span
        className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Bottom line */}
      <span
        className={`h-0.5 w-6 transform bg-foreground transition-all duration-300 ${
          isOpen ? '-translate-y-2 -rotate-45' : ''
        }`}
      />
    </button>
  );
};
