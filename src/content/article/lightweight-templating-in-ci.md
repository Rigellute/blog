---
title: Lightweight templating with envsubst
description: Sometimes you need to substitute values in a structured text file and envsubst might just be the utility you need.
pubDate: '2023-10-26'
author: 'Alexander Keliris'
---

Sometimes you need to substitute values in a structured text file in your CI pipeline based on some dynamic values e.g. environment variables.

There are many ways to do this, but one lightweight approach is to use the util [envsubst](https://man7.org/linux/man-pages/man1/envsubst.1.html) from the [GNU gettext](https://www.gnu.org/software/gettext/) package.

`envsubst` may already be installed on your machine or CI runner.

## Example

Let's say I want to provide runtime config for a web frontend. I'll do this by importing a `.js` file that adds the config to the `window`.

My config is going to be different in each stage of my deployment pipeline, so I need to generate this file based on environment variables.

Here is my JavaScript template:

```js
// config-template.js
window.myAppConfig = {
  apiUrl: '${MY_API_URL}',
  authUrl: '${MY_AUTH_URL}',
}
```

`envsubst` will substitute the `${MY_API_URL}` and `${MY_AUTH_URL}` markers with matching environment variables.

```sh
export MY_API_URL=https://example.com export MY_AUTH_URL=https://auth.example.com
envsubst < config-template.js
```

Outputting the following:

```js
window.myAppConfig = {
  apiUrl: 'https://example.com',
  authUrl: 'https://auth.example.com',
}
```

## Install

In case `envsubst` isn't already installed on your machine/CI pipeline, install it.

Ubuntu:

```sh
apt-get update
apt-get install gettext
```

macOS:

```sh
brew install gettext
```
