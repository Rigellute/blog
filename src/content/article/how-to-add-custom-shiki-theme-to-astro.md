---
title: How to add a custom theme for syntax highlighting with Astro and Shiki
description: Shiki makes use of vscode themes and Astro allows you to easily customise the Shiki config for markdown.
pubDate: '2023-11-09'
author: 'Alexander Keliris'
---

One of the great things about [Astro](https://astro.build/) is that it comes with syntax highlighting for Markdown code blocks out-of-the-box: using [Shiki](https://shiki.matsu.io/) by default or letting you choose [Prism](https://prismjs.com/).

I've written custom Prism themes before ([rigel theme](https://github.com/Rigellute/rigel/blob/master/www/css/prism.css)), and previous iterations of this blog used Prism to highlight code blocks.

However, I am drawn to Shiki as it lets you use any of the innumerable vscode themes.

## Find your theme

In this example, we will use the amazing [catppuccin mocha](https://github.com/catppuccin/catppuccin) theme. The vscode JSON can be found [here](https://github.com/catppuccin/vscode/blob/compiled/mocha.json). Now copy and paste the JSON into a file in your Astro project.

Or you could fetch it with curl:

```shell
curl https://github.com/catppuccin/vscode/blob/compiled/mocha.json -o syntax-theme.json
```

## Configure Astro

Open your `astro.config.mjs` and add your theme to the markdown config: 

```js
// Import your json theme
import syntaxTheme from './syntax-theme.json'

export default defineConfig({
    markdown: {
        shikiConfig: {
            theme: syntaxTheme,
        },
    },
})
```

You might need to restart your dev server, but then that's it 🚀! 

## Tweak the theme

Another benefit of this approach is that you can tweak the syntax theme to more closely match your site's theme. For example, you can change the background color of the code block:

```diff
- "editor.background": "#1e1e2e",
+ "editor.background": "#0E0E10",
```