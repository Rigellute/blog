import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Iris from '../images/IrisLight.inline.svg';

const Header = ({ siteTitle }) => (
  <header className="p-6 flex flex-col justify-center items-center mb-12 bg-background">
    <Link
      className="flex flex-col justify-center items-center text-foreground no-underline hover:underline"
      to="/"
    >
      <h1>{siteTitle}</h1>
      <div className="w-56">
        <Iris />
      </div>
    </Link>
    <Link className="text-foreground no-underline hover:underline" to="/about">
      About
    </Link>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
