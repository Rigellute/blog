# Alexander Keliris' Blog

## Dev

Install deps:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project:

```sh
cp .env.example .env.local
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Tech

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Astro](https://docs.astro.build)
- [MDX](https://mdxjs.com)

## Updating syntax highlighting

Probably won't be needed, but I wrote a script to help me quickly test different shiki themes.

- Find a vscode theme in `.json` e.g. [Night Owl](https://github.com/sdras/night-owl-vscode-theme/blob/main/themes/Night%20Owl-color-theme.json).
- Paste into the theme file: `pbpaste > syntax-theme.json`
- Run the script to set the background to a darker color to match the site's theme: `node scripts/syntax-theme.mjs`.
