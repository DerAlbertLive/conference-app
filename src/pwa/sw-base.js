
// if there is a new service worker available then clear all caches
self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys()
          .then(cacheNames => {
              cacheNames.forEach(c => caches.delete(c))
          })
  );
});

workbox.routing.registerRoute(
  /.*(?:speakerpicture)/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'speaker-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 60 images
        maxEntries: 60,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

self.addEventListener('message', (event) => {
  if (!event.data){
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);