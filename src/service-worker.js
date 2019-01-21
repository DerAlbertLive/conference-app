


workbox.core.setCacheNameDetails({prefix: "conference-app"});

// nicht 98

// Mein Service Worker
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

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {                
                cacheNames.forEach(c => caches.delete(c))
            })
    );
  });

self.addEventListener('message', event => {
    if (event.data.command === 'speakerImagesUpdate') {
        for (const uri of event.data.imageUris) {
            registerUri(uri);
        }    
    }
});

function registerUri(uri) {
    console.log('registerUri', uri);
  workbox.routing.registerRoute(
    uri,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'speaker-image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache for a maximum of a week
          maxAgeSeconds: 30,
        })
      ]
    })
  );
}  

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
        })
      ]
    })
  );