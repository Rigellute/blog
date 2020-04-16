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
import { Container } from '../components/container';

import Nav from './nav';

const Layout = ({ children }: { children: React.ReactNode }) => (
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
        <Container as="main" className="flex-grow">
          {children}
        </Container>
        <footer className="py-6 mt-8 bg-rigelBackground">
          <Container className="flex justify-between">
            <div className="text-sm text-gray-400">
              © Alexander Keliris (Rigellute) {new Date().getFullYear()}{' '}
            </div>
            <div className="flex">
              <IconLink
                className="mr-3 xl:mr-4"
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
          </Container>
        </footer>
      </div>
    )}
  />
);

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
