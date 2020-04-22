/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({
  isBlogPost = false,
  description = '',
  lang = 'en',
  title,
  imagePath = '',
}: {
  isBlogPost?: boolean;
  description?: string;
  lang?: string;
  title: string;
  imagePath?: string;
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            author
            twitterUsername
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  // Fix remote build error: "window" is not available during server side rendering.
  let origin = '';
  if (typeof window !== 'undefined') {
    origin = window.location.origin;
  }

  const imagePathWithOrigin = imagePath ? origin + imagePath : '';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {/* General tags */}
      <meta name="description" content={metaDescription} />
      <meta name="image" content={imagePathWithOrigin} />
      <link rel="canonical" href={origin} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={origin} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imagePathWithOrigin} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imagePathWithOrigin} />
    </Helmet>
  );
}

export default SEO;
