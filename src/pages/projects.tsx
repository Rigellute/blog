import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
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
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div style={{ height: 200 }} className="overflow-hidden">
      <Img className="w-full" alt="Project image" fluid={props.image} />
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{props.title}</div>
      <p className="text-gray-700 text-base">{props.description}</p>
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
            className="text-gray-500 hover:text-gray-700 mr-3 xl:mr-4"
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

export default () => {
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
