import React from 'react';
import Github from '../images/github.inline.svg';
import Twitter from '../images/twitter.inline.svg';

export const IconLink = ({ href, Icon, isInverted }) => {
  const hoverColor = isInverted ? 'text-gray-300' : 'text-gray-700';
  return (
    <a
      className={`block flex items-center text-gray-500 hover:${hoverColor} mr-5`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="fill-current w-5 h-5" />
    </a>
  );
};

IconLink.Github = Github;
IconLink.Twitter = Twitter;
