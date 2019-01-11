
const workboxSW = new self.WorkboxSW();

workboxSW.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workboxSW.expiration.Plugin({
          // Cache only 60 images
          maxEntries: 60,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ]
    })
  );

workboxSW.precache(self.__precacheManifest || []);