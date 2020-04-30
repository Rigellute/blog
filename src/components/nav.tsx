import React from 'react';
import { Link } from 'gatsby';
// @ts-ignore
import MenuIcon from '../images/menu-icon.inline.svg';
// @ts-ignore
import CrossIcon from '../images/menu-cross.inline.svg';
// @ts-ignore
import Iris from '../images/IrisLight.inline.svg';
import { IconLink } from '../components/icon-link';

export const NavContainer = ({
  className,
  as = 'div',
  children,
}: {
  children: React.ReactNode;
  className: string;
  as?: string;
}) => {
  return React.createElement(as, {
    className: `px-4 md:px-8 lg:px-16 ${className}`,
    children,
  });
};

const Nav = ({ siteTitle }: { siteTitle: string }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const navItemsClass = isMenuOpen ? '' : 'hidden';
  return (
    <NavContainer as="nav" className="p-6 px-4 mb-4 bg-gray-900 lg:p-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 mr-6 text-foreground">
          <div className="w-16 mr-3 md:w-32 lg:w-48 md:mr-5">
            <Iris />
          </div>
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight no-underline navigation-header-text-gray lg:text-3xl"
          >
            {siteTitle}
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 navigation-header-text-gray focus:outline-none"
          >
            {isMenuOpen ? (
              <CrossIcon className="w-4 h-4 fill-current" />
            ) : (
              <MenuIcon className="w-4 h-4 fill-current" />
            )}
          </button>
        </div>
        <div className={`hidden lg:flex justify-end xl:w-1/4`}>
          <div className="flex items-center justify-start">
            <Link
              className="block mt-4 mr-3 font-normal no-underline xl:mr-4 lg:inline-block lg:mt-0 navigation-header-text-gray"
              to="/projects"
            >
              Projects
            </Link>
            <Link
              className="block mt-4 mr-3 font-normal no-underline xl:mr-4 lg:inline-block lg:mt-0 navigation-header-text-gray"
              to="/about"
            >
              About
            </Link>
            <Link
              className="block mt-4 mr-3 font-normal no-underline xl:mr-4 lg:inline-block lg:mt-0 navigation-header-text-gray"
              to="/contact"
            >
              Contact
            </Link>
            <IconLink
              className="mr-3 navigation-header-text-gray xl:mr-4"
              href="https://github.com/Rigellute?tab=repositories"
              Icon={IconLink.Github}
            />
            <IconLink
              className="navigation-header-text-gray"
              href="https://twitter.com/AlexKeliris"
              Icon={IconLink.Twitter}
            />
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${navItemsClass}`}>
        <Link
          className="block mt-4 mr-4 font-normal no-underline lg:inline-block lg:mt-0 navigation-header-text-gray"
          to="/about"
        >
          <p>About</p>
        </Link>
        <Link
          className="block mt-4 mr-4 font-normal no-underline lg:inline-block lg:mt-0 navigation-header-text-gray"
          to="/projects"
        >
          <p>Projects</p>
        </Link>
        <Link
          className="block mt-4 mr-4 font-normal no-underline lg:inline-block lg:mt-0 navigation-header-text-gray"
          to="/contact"
        >
          <p>Contact</p>
        </Link>
        <div className="flex">
          <IconLink
            className="mr-3 navigation-header-text-gray"
            href="https://github.com/Rigellute?tab=repositories"
            Icon={IconLink.Github}
          />
          <IconLink
            className="navigation-header-text-gray mr-3"
            href="https://twitter.com/AlexKeliris"
            Icon={IconLink.Twitter}
          />
        </div>
      </div>
    </NavContainer>
  );
};

export default Nav;
