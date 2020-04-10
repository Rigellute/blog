import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
// @ts-ignore
import MenuIcon from '../images/menu-icon.inline.svg';
// @ts-ignore
import CrossIcon from '../images/menu-cross.inline.svg';
// @ts-ignore
import Iris from '../images/IrisLight.inline.svg';
import { IconLink } from '../components/icon-link';

const Nav = ({ siteTitle }: { siteTitle: string }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const navItemsClass = isMenuOpen ? '' : 'hidden';
  return (
    <nav className="container mb-4 px-4 md:px-8 lg:px-32 xl:px-48 pt-6 lg:pt-10 ">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-foreground mr-6">
          <div className="w-16 md:w-32 lg:w-48 mr-3 md:mr-5">
            <Iris />
          </div>
          <Link
            to="/"
            className="text-gray-900 no-underline font-semibold text-xl lg:text-3xl tracking-tight"
          >
            {siteTitle}
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 text-gray-500 focus:outline-none focus:text-gray-700"
          >
            {isMenuOpen ? (
              <CrossIcon className="fill-current w-4 h-4" />
            ) : (
              <MenuIcon className="fill-current w-4 h-4" />
            )}
          </button>
        </div>
        <div className={`hidden lg:flex justify-end xl:w-1/4`}>
          <div className="flex justify-start items-center">
            <Link
              className="block mr-3 xl:mr-4 mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-gray-700 no-underline font-normal"
              to="/about"
            >
              About
            </Link>
            <IconLink
              className="mr-3 xl:mr-4"
              href="https://github.com/Rigellute?tab=repositories"
              Icon={IconLink.Github}
            />
            <IconLink
              href="https://twitter.com/AlexKeliris"
              Icon={IconLink.Twitter}
            />
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${navItemsClass}`}>
        <Link
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4 no-underline font-normal"
          to="/about"
        >
          <p>About</p>
        </Link>
        <div className="flex">
          <IconLink
            className="mr-3"
            href="https://github.com/Rigellute?tab=repositories"
            Icon={IconLink.Github}
          />
          <IconLink
            className="mr-3"
            href="https://twitter.com/AlexKeliris"
            Icon={IconLink.Twitter}
          />
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  siteTitle: PropTypes.string,
};

Nav.defaultProps = {
  siteTitle: ``,
};

export default Nav;
