---
title: 'Auth0 `loginWithPopup` error and workaround'
description: 'When `crossOriginIsolated` is enabled, the Auth0 `loginWithPopup` method fails with an error. This article explains the error and suggests a workaround.'
pubDate: '2023-09-25'
author: 'Alexander Keliris'
---

I recently integrated [Auth0 Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) into a React SPA but had a problem with the `loginWithPopup` flow (from the `@auth0/auth0-react` library).

The popup would open, allowing the user to login. But then on success, the Auth0 redirect would result in the following error:

```
Failed to execute 'postMessage' on 'DOMWindow':
  The target origin provided ('http://my-origin') does not match the recipient window's origin ('https://unique-id.us.auth0.com').
```

This error prevented the login flow from completing.

I wasn't able to find much information online about this problem.
But after much pain and experimentation, the issue turned out be caused by `crossOriginIsolated` being `true` on my site,
which is enabled by the following headers:

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

[`crossOriginIsolated`](https://developer.mozilla.org/en-US/docs/Web/API/crossOriginIsolated) is needed to unlock browser features such as `SharedArrayBuffer` and `performance.now()`.
Since my application requires these features, I needed to find a workaround that had a similar UX to Auth0's `loginWithPopup`.

## Workaround

Here is a high-level overview of my workaround:

1. On the login page, register an event listener for local storage. We will be listening for a change to an `isLoggedIn` flag set in the popup window.
1. When the user clicks "login", open a popup window on a route that immediately triggers the Auth0 redirect.
1. The user is redirected to Auth0 and logs in.
1. Auth0 then redirects back to my site, we check for success, and set the `isLoggedIn` flag to a truthy value.
1. The popup window can now close itself.
1. Back in the main window, the local storage event listener is triggered, and we can use the Auth0 method `getAccessTokenSilently` to refresh the auth state.

We are now logged in inside the main window! There probably are other workarounds, but this is working fine for us, at least for now.

### Note

This approach requires you to configure Auth0 to cache using local storage and to enable refresh tokens. For React, that looks like this:

```tsx
<Auth0Provider
  domain={config.auth0Domain}
  clientId={config.auth0ClientID}
  authorizationParams={{
    redirect_uri: `${config.baseUrl}/callback`,
  }}
  cacheLocation={'localstorage'}
  useRefreshTokens
>
```

## Debugging

For local reproduction of this issue, I used [Caddy](https://caddyserver.com/) as a reverse proxy, so I could conveniently add the headers to enable `crossOriginIsolated`:

```
# Caddyfile
:4200 {
  reverse_proxy localhost:4201 {
     header_down +Cross-Origin-Opener-Policy same-origin
     header_down +Cross-Origin-Embedder-Policy require-corp
  }
}
```

1. Start your React dev server, which in my case is running on port `4201`.
1. Start Caddy with `caddy run`.
1. Go to `localhost:4200`.
1. Open the dev tools console.
1. Type `crossOriginIsolated` and hit enter: you will see it is `true`.
1. Try using the `loginWithPopup` flow.

After entering your credentials within the "Univerval Login" UI, the popup will just be a blank white screen. Open the dev tools for the popup window, and you should see the `postMessage` error from above.
