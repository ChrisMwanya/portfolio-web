import React from 'react';
import { ListItemIconProps } from './index';

const ListItemIcon = ({
  children,
  className,
  iconClassName,
}: ListItemIconProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={iconClassName} />
      {children}
    </div>
  );
};

export default ListItemIcon;
