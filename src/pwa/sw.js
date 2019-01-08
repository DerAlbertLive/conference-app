workbox.clientsClaim();

workbox.routing.registerRoute(
    /\/api\/(configuration|translation\/.*\/shared\/webapp)/,
    workbox.strategies.networkFirst()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// this gives the user to update the sw by it self
self.addEventListener('message', (event) => {
    if (!event.data) {
        return;
    }

    switch (event.data) {
        case 'skipWaiting':
            self.skipWaiting();
            break;
        default:
            break;
    }
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                cacheNames.forEach(c => caches.delete(c))
            })
    );
});