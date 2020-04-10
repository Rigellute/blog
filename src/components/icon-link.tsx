import React from 'react';
// @ts-ignore
import GithubIcon from '../images/github.inline.svg';
// @ts-ignore
import TwitterIcon from '../images/twitter.inline.svg';

export const IconLink = ({
  href,
  Icon,
  isInverted,
  className,
}: {
  href: string;
  Icon: React.ElementType;
  isInverted?: boolean;
  className?: string;
}) => {
  const hoverColor = isInverted ? 'text-gray-300' : 'text-gray-700';
  return (
    <a
      className={`${className} block flex items-center text-gray-500 hover:${hoverColor}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="fill-current w-5 h-5" />
    </a>
  );
};

IconLink.Github = GithubIcon;
IconLink.Twitter = TwitterIcon;
