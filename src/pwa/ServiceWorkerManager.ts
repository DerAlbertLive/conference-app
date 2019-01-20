import { register } from 'register-service-worker';

export default class ServiceWorkerManager {
  //// public installPromptEvent: BeforeInstallPromptEvent = null;
  
  constructor() {
    //// window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt.bind(this))
  }

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
        setInterval(() => {
          registration.update();
        }, 1000 * 60 * 60); // hourly checks
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

  private beforeInstallPrompt(e: BeforeInstallPromptEvent){
    //// this.installPromptEvent = e;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed',
      platform: string
  }>;

  prompt(): Promise<void>;
}
