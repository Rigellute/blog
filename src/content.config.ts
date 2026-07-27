import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const article = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/article' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      socialImage: image().optional(),
    }),
})

export const collections = { article }
