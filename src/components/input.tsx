import React from 'react';
import SearchIcon from '../images/search.inline.svg';

export const Input = ({
  isSearch = false,
  placeholder = '',
  onChange,
  className = '',
  type = 'text',
  value,
}: {
  isSearch?: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  value: string;
}) => {
  const searchStyle = isSearch ? 'pl-10 pr-4' : '';
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className={`transition-colors duration-100 ease-in-out focus:outline-0 w-full text-base text-gray-900 block px-4 py-2 leading-normal bg-cool-gray-100 border border-transparent rounded-lg appearance-none placeholder-cool-gray-500 focus:bg-white focus:border-cool-gray-200 ${searchStyle} ${className}`}
        value={value}
        onChange={onChange}
      />
      {isSearch ? (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon className="fill-none pointer-events-none text-gray-600 w-4 h-4" />
        </div>
      ) : null}
    </div>
  );
};
