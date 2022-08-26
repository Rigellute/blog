import React from 'react';

import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ location }: PageProps) => {
  return (
    <Layout>
      <SEO path={location.pathname} title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
