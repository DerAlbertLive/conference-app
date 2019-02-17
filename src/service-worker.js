
workbox.core.setCacheNameDetails({ prefix: 'conference-app' });
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.skipWaiting();
workbox.clientsClaim();

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       cacheNames.forEach((c) => caches.delete(c));
//     }),
//   );
// });

let imagesToCache = [];
let dataToCache = [];

self.addEventListener('message', async (event) => {
  if (event.data.command === 'speakerImagesUpdate') {
    imagesToCache = event.data.uris;
    const cache = await caches.open('speaker-images');
    cache.addAll(imagesToCache);
  }

  if (event.data.command === 'conferenceDataUpdate') {
    dataToCache = event.data.uris;
    const cache = await caches.open('conference-data');
    cache.addAll(dataToCache);
  }
});

function imageUrlMatcher(uris, context) {
  const href = context.url.href;
  const index = uris.indexOf(href);
  if (index < 0)
  {
    return null;
  }
  return true;
}

function dataUrlMatcher(uris, context) {
  const href = context.url.href;
  for (const uri of uris) {
      if (uri.startsWith("http:") || uri.startsWith('https:')) {
        if (href === uri) {
          return true;
        }
      } else {
        if (context.url.pathname === uri) {
          return true;          
        }
      }
  }
  return null;
}

workbox.routing.registerRoute(
  function (context) { return imageUrlMatcher(imagesToCache, context)},
  workbox.strategies.cacheFirst({
    cacheName: 'speaker-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24, // 24 Hours
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  function (context) { return dataUrlMatcher(dataToCache, context)},
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'conference-data',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 30, // 30 Minuten
      }),
    ],
  }),
);

