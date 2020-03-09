import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Iris from '../images/IrisLight.inline.svg';

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(0);

  const navItemsClass = isMenuOpen ? '' : 'hidden';
  return (
    <nav className="bg-background">
      <div className="container px-4 md:px-8 lg:px-32 xl:px-48 py-6 lg:py-10 flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-foreground mr-6">
          <div className="w-16 md:w-32 lg:w-48 mr-3 md:mr-5">
            <Iris />
          </div>
          <Link
            to="/"
            className="text-foreground no-underline hover:underline font-semibold text-xl lg:text-2xl tracking-tight"
          >
            {siteTitle}
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-foreground border-white hover:text-blueBright hover:border-blueBright"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${navItemsClass} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-blueBright hover:text-cyan mr-4 no-underline hover:underline"
              to="/about"
            >
              About
            </Link>
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-blueBright hover:text-cyan mr-4 no-underline hover:underline"
              to="/"
            >
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
