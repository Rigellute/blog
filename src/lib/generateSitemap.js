import glob from 'fast-glob'
import * as path from 'path'
import prettier from 'prettier'
import { writeFile } from 'fs/promises'

export async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await glob(['pages/*.jsx', '!pages/_*.jsx', 'pages/**/*.mdx'], {
    cwd: path.join(process.cwd(), 'src/'),
  })

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('.jsx', '')
              .replace('.mdx', '')
              .replace('/index', '')

            return `
              <url>
                  <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}${path}`}</loc>
              </url>
            `
          })
          .join('')}
    </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  await writeFile('public/sitemap.xml', formatted)
}
