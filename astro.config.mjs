import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import rehypePrism from '@mapbox/rehype-prism'

import alpinejs from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
    rehypePlugins: [rehypePrism],
  },
  site: 'https://keliris.dev',
  integrations: [mdx(), sitemap(), react(), tailwind(), alpinejs()],
})

