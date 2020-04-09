/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { IconLink } from './icon-link';

import Nav from './nav';

const container = 'container px-4 md:px-8 lg:px-32 xl:px-48';
const Layout = ({ children }) => (
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
    render={data => (
      <div className="flex flex-col min-h-screen">
        <Nav siteTitle={data.site.siteMetadata.title} />
        <main className={`flex-grow ${container}`}>{children}</main>
        <footer className="py-6 mt-8 bg-background">
          <div className={`${container} flex justify-between`}>
            <div className="text-sm text-gray-400">
              © Alexander Keliris (Rigellute) {new Date().getFullYear()}{' '}
            </div>
            <div className="flex">
              <IconLink
                isInverted
                href="https://github.com/Rigellute?tab=repositories"
                Icon={IconLink.Github}
              />
              <IconLink
                isInverted
                href="https://twitter.com/AlexKeliris"
                Icon={IconLink.Twitter}
              />
            </div>
          </div>
        </footer>
      </div>
    )}
  />
);

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
