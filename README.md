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
- [Next.js](https://nextjs.org/docs)
- [Headless UI](https://headlessui.dev)
- [MDX](https://mdxjs.com)

## Lute Search

For local dev, spin up the MeiliSearch server:

```sh
docker compose up -d
```

To load search engine, use the [lute-spreadsheet-to-meilisearch](https://github.com/Rigellute/lute-spreadsheet-to-meilisearch) repo.

Add the following to your `.env`:

```
MEILISEARCH_API_KEY=test
MEILISEARCH_HOST=http://localhost:7700
LUTE_MUSIC_URL=https://www.lutemusic.org/spreadsheet.xlsx
```

Run:

```sh
cargo run --release
```

## Updating syntax highlighting

Probably won't be needed, but I wrote a script to help me quickly test different shiki themes.

- Find a vscode theme in `.json` e.g. [Night Owl](https://github.com/sdras/night-owl-vscode-theme/blob/main/themes/Night%20Owl-color-theme.json).
- Paste into the theme file: `pbpaste > syntax-theme.json`
- Run the script to set the background to a darker color to match the site's theme: `node scripts/syntax-theme.mjs`.
