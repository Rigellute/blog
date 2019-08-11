/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { GitHub, Twitter } from 'react-feather';

import { theme } from '../styles/theme';
import Header from './header';
import './layout.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.foreground};
    color: ${props => props.theme.colors.background};
  }

  a {
    color: ${props => props.theme.colors.red};
  }
`;

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

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
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Body>
            <main>{children}</main>
            <footer>
              <p>
                © Alexander Keliris (Rigellute)
                {new Date().getFullYear()}{' '}
                <a
                  href="https://github.com/Rigellute?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub size={20} />
                </a>{' '}
                <a
                  href="https://twitter.com/AlexKeliris"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                </a>
              </p>
            </footer>
          </Body>
        </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
