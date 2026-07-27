/** @type {import('prettier').Options} */
module.exports = {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro'],
  // Tailwind v4: class sorting reads the theme from the stylesheet, not a JS config.
  tailwindStylesheet: './src/styles/global.css',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
