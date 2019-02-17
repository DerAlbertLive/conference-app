/* tslint:disable:no-console */

import { register } from 'register-service-worker';

console.log('Environment', process.env);
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(registration) {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB',
      );
      console.log('ready', registration.active);
      if (reg) {
        reg(registration);
      }
    },
    registered(registration: ServiceWorkerRegistration) {
      console.log('Service worker has been registered.');
      if (reg) {
        reg(registration);
      }
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
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

let reg: (sr: ServiceWorkerRegistration) => void;

function registerOnRegister(callback: (sr: ServiceWorkerRegistration) => void) {
  reg = callback;
}
export default registerOnRegister;
