/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { IconLink } from './icon-link';

import Nav, { NavContainer } from './nav';

const Layout = ({
  children,
  isArticle = false,
}: {
  isArticle?: boolean;
  children: React.ReactNode;
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <div className="flex flex-col min-h-screen">
        <Nav siteTitle={data.site.siteMetadata.title} />
        <main
          className={`${
            isArticle
              ? 'container mx-auto px-4 md:px-8 lg:px-32 xl:px-48'
              : 'px-4 md:px-8 lg:px-16'
          } flex-grow`}
        >
          {children}
        </main>
        <footer className="py-6 mt-8 bg-rigelBackground">
          <NavContainer className="flex justify-between">
            <div className="text-sm navigation-header-text-gray">
              © Alexander Keliris (Rigellute) {new Date().getFullYear()}{' '}
            </div>
            <div className="flex">
              <IconLink
                className="navigation-header-text-gray mr-3 xl:mr-4"
                href="https://github.com/Rigellute?tab=repositories"
                Icon={IconLink.Github}
              />
              <IconLink
                className="navigation-header-text-gray"
                href="https://twitter.com/AlexKeliris"
                Icon={IconLink.Twitter}
              />
            </div>
          </NavContainer>
        </footer>
      </div>
    )}
  />
);

export default Layout;
