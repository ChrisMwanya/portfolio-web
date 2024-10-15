import React from 'react';
import { NavbarProps } from './type';
import MenuItem from './menu-item/menu-item';

export const Navbar: React.FC<NavbarProps> = ({ className, menuItems }) => {
  return (
    <nav>
      <div className={`flex justify-between gap-0 ${className}`}>
        {menuItems.map((item) => (
          <MenuItem key={item.title} href={item.href} title={item.title} />
        ))}
      </div>
    </nav>
  );
};
