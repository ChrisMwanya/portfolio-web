import React from 'react';
import {
  CustomButtonProps,
  CustomButtonLinkProps,
  IconButtonProps,
  IconButtonLinkProps,
} from './type';
import { Button } from '../ui/button';
import Link from 'next/link';

export const CustomButtonLink = ({
  children,
  href,
  target,
}: CustomButtonLinkProps) => {
  return (
    <CustomButton>
      <Link href={href} target={target} className="flex items-center gap-2">
        {children}
      </Link>
    </CustomButton>
  );
};

export const CustomButton = ({ children }: CustomButtonProps) => {
  return (
    <Button className="group relative overflow-hidden rounded-3xl border-2 border-main bg-main px-6 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-amber-600 hover:shadow-2xl">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export const IconButtonLink = ({ children, link }: IconButtonLinkProps) => {
  return (
    <Button
      variant="link"
      size="icon"
      className="hover:bg-primary-foreground hover:text-yellow-50"
    >
      <Link href={link} target="_blank">
        {children}
      </Link>
    </Button>
  );
};

export const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <Button
      size="icon"
      className="rounded-full hover:bg-main hover:text-yellow-50"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
