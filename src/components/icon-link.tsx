import React from 'react';
import GithubIcon from '../images/github.inline.svg';
import TwitterIcon from '../images/twitter.inline.svg';

export const IconLink = ({
  href,
  Icon,
  className,
}: {
  href: string;
  Icon: React.ElementType;
  className?: string;
}) => {
  return (
    <a
      className={`block flex items-center ${className}`}
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
