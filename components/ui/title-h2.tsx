import React from 'react';

interface TitleH1Props {
  children: React.ReactElement | string;
  className?: string;
}

const H2: React.FC<TitleH1Props> = ({ children, className }) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};

export default H2;
