import React from 'react';

export const Container = ({
  className,
  as = 'div',
  children,
}: {
  children: React.ReactNode;
  className: string;
  as?: string;
}) => {
  return React.createElement(as, {
    className: `container px-4 md:px-8 lg:px-32 xl:px-48 ${className}`,
    children,
  });
};
