import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import syntaxTheme from './syntax-theme.json'

import tailwindcss from '@tailwindcss/vite'

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
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})
