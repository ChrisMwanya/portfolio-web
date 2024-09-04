export type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export type CustomButtonLinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
};

export type IconButtonProps = {
  children: React.ReactNode;
  type: string;
};

export type IconButtonLinkProps = {
  children: React.ReactNode;
  link: string;
};
