/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { GitHub, Twitter } from 'react-feather';

import Nav from './nav';
import './layout.css';

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
      <div>
        <Nav siteTitle={data.site.siteMetadata.title} />
        <div className={container}>
          <main>{children}</main>
        </div>
        <footer className="py-6">
          <div className={`${container} flex`}>
            <div className="text-sm">
              © Alexander Keliris (Rigellute) {new Date().getFullYear()}{' '}
            </div>
            <a
              href="https://github.com/Rigellute?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-2"
            >
              <div className="mr-1">github</div> <GitHub size={20} />
            </a>
            <a
              href="https://twitter.com/AlexKeliris"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-2"
            >
              <div className="mr-1">twitter</div> <Twitter size={20} />
            </a>
          </div>
        </footer>
      </div>
    )}
  />
);

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
