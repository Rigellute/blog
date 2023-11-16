import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import syntaxTheme from './syntax-theme.json'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: syntaxTheme,
    },
  },
  site: 'https://keliris.dev',
  integrations: [mdx(), sitemap(), react(), tailwind(), alpinejs()],
})
