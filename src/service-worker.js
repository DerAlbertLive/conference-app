workbox.core.setCacheNameDetails({ prefix: 'conference-app' });
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.skipWaiting();
workbox.clientsClaim();

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((c) => caches.delete(c));
    }),
  );
});

let imagesToCache = [];

self.addEventListener('message', (event) => {
  if (event.data.command === 'speakerImagesUpdate') {
    imagesToCache = event.data.imageUris;
  }
});


function matchCallback(context) {
  const href = context.url.href;
  const index = imagesToCache.indexOf(href);
  if (index < 0)
  {
    return null;
  }
  return true;
}

workbox.routing.registerRoute(
  matchCallback,
  workbox.strategies.cacheFirst({
    cacheName: 'speaker-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum of a week
        maxAgeSeconds: 30,
      }),
    ],
  }),
);

// Hack To resolver workbox.routing before registerUri
workbox.routing.registerRoute(
  'https://foo',
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'speaker-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache for a maximum of a week
        maxAgeSeconds: 30,
      }),
    ],
  }),
);
