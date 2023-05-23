import React from 'react';
import { PageProps, useStaticQuery, graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import Layout from '../components/layout';
import { IconLink } from '../components/icon-link';
import SEO from '../components/seo';

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  image: FluidObject;
  readMoreLink?: string;
  projectLink?: string;
};

const Card = (props: CardProps) => (
  <div className="overflow-hidden rounded shadow-lg max-w-screen">
    <div style={{ height: 200 }} className="overflow-hidden bg-gray-900">
      <Img className="w-full" alt="Project image" fluid={props.image} />
    </div>
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">{props.title}</div>
      <p className="text-base text-gray-700">{props.description}</p>
      <div className="flex mb-4">
        {/* Links be external or local. But this nested ternary is not pretty */}
        {props.readMoreLink?.includes('http') ? (
          <a
            className="mr-2"
            href={props.readMoreLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        ) : props.readMoreLink ? (
          <Link className="mr-2" to={props.readMoreLink}>
            Read more
          </Link>
        ) : null}
        {props.projectLink ? (
          <IconLink
            className="mr-3 text-gray-500 hover:text-gray-700 xl:mr-4"
            href={props.projectLink}
            Icon={IconLink.Github}
          />
        ) : null}
      </div>
      <div>
        {props.tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ({ location }: PageProps) => {
  const data = useStaticQuery(graphql`
    query {
      spotifyTui: file(relativePath: { eq: "spotify-tui-1.png" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      rigelTheme: file(relativePath: { eq: "rigel-code-theme.png" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      lute: file(relativePath: { eq: "lute-1.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);
  return (
    <Layout>
      <SEO
        path={location.pathname}
        title="Projects"
        description="Projects of Alexander Keliris (Rigellute)"
      />
      <h1>Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        <Card
          title="Lute Music Search"
          description="Search over 16,000 lute pieces"
          tags={['Lute', 'Music', 'MeiliSearch']}
          readMoreLink="/lute-search"
          image={data.lute.childImageSharp.fluid}
        />
        <Card
          title="spotify-tui"
          description="Spotify for the terminal written in Rust 🚀"
          tags={['Rust', 'Terminal']}
          readMoreLink="/spotify-tui"
          projectLink="https://github.com/Rigellute/spotify-tui"
          image={data.spotifyTui.childImageSharp.fluid}
        />
        <Card
          title="Rigel"
          description="🌌 Colorscheme based on the star Rigel ✨."
          tags={['Vim', 'Terminal', 'Design']}
          readMoreLink="https://rigel.netlify.app/"
          projectLink="https://github.com/Rigellute/rigel"
          image={data.rigelTheme.childImageSharp.fluid}
        />
      </div>
    </Layout>
  );
};
