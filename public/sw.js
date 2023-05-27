// This is an attempt to clear out the old service worker provided by `gatsby-plugin-offline`
// https://github.com/gatsbyjs/gatsby/issues/2880
// https://github.com/NekR/self-destroying-sw
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.registration.unregister()
    .then(function() {
      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => client.navigate(client.url))
    });
});
