import React from 'react';

const baseStyle =
  'inline-flex items-center border border-transparent text-white font-medium bg-gray-900 hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition ease-in-out duration-150';

const sizes = {
  xsmall: 'px-2.5 py-1.5 text-xs leading-4 rounded',
  small: 'px-3 py-2 text-sm leading-4 rounded-md',
  medium: 'px-4 py-2 text-sm leading-5 rounded-md',
  large: 'px-4 py-2 text-base leading-6 rounded-md',
  xlarge: 'px-6 py-3 text-base leading-6 rounded-md',
};

export const Button = ({
  children,
  size,
  type,
}: {
  children: React.ReactNode;
  size?: keyof typeof sizes;
  type?: 'submit' | 'reset' | 'button';
}) => {
  const buttonSizeStyles = !size ? sizes.medium : sizes[size];
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button type={type} className={`${baseStyle} ${buttonSizeStyles}`}>
        {children}
      </button>
    </span>
  );
};
