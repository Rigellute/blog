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

To load search engine, use the [lute-spreadsheet-to-meilisearch](https://github.com/Rigellute/lute-spreadsheet-to-meilisearch) repo to output the `gerbode.json`, and ingest with:

```sh
curl \
  -X POST 'http://localhost:7700/indexes/lute/documents?primaryKey=id' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer test' \
  --data-binary @gerbode.json
```
