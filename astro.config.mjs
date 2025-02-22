import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import syntaxTheme from './syntax-theme.json'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: syntaxTheme,
    },
  },
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true,
  },
  site: 'https://keliris.dev',
  integrations: [mdx(), sitemap(), react(), tailwind()],
})
