import { register } from 'register-service-worker';

export default class ServiceWorkerManager {
  public registerServiceWorker(): void {
    register('/service-worker.js', {
      ready() {
        console.log(
          'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB',
        );
      },
      registered(registration) {
        console.log('Service worker has been registered.');
      },
      cached(registration) {
        console.log('Content has been cached for offline use.');
      },
      updatefound(registration) {
        console.log('New content is downloading.');
      },
      updated(registration) {
        console.log('New content is available; please refresh.');
      },
      offline() {
        console.log(
          'No internet connection found. App is running in offline mode.',
        );
      },
      error(error) {
        console.error('Error during service worker registration:', error);
      },
    });
  }
}
