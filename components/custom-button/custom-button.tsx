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
    <Button className="hover:bg-main-50 rounded-3xl border-4 border-main bg-main text-sky-50 hover:border-foreground">
      {children}
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

export const IconButton = ({ children }: IconButtonProps) => {
  return (
    <Button
      size="icon"
      className="rounded-full hover:bg-main hover:text-yellow-50"
    >
      {children}
    </Button>
  );
};
