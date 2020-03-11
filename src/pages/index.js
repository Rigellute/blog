import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './index.css';

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Thoughts and notes</h1>
        <p className="text-sm">{data.allMarkdownRemark.totalCount} Posts</p>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link style={{ textDecoration: 'none' }} to={node.fields.slug}>
              <h2 className="mb-1 hover:underline">{node.frontmatter.title}</h2>
            </Link>
            <div className="text-sm font-semibold">{node.frontmatter.date}</div>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { isHiddenFromPosts: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
