import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/aws-apigw-https-proxy',
        destination: '/articles/aws-apigw-https-proxy',
        permanent: true,
      },
      {
        source: '/meiliesearch',
        destination: '/articles/meiliesearch',
        permanent: true,
      },
      {
        source: '/improving-spotify-tui',
        destination: '/articles/improving-spotify-tui',
        permanent: true,
      },
      {
        source: '/spotify-tui',
        destination: '/articles/spotify-tui',
        permanent: true,
      },
      {
        source: '/rigel-theme',
        destination: '/articles/rigel-theme',
        permanent: true,
      },
      {
        source: '/shades-of-purple-vim',
        destination: '/articles/shades-of-purple-vim',
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
