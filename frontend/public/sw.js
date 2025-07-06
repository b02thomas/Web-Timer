// Service Worker für PWA-Funktionalität
const CACHE_NAME = 'intervall-timer-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Installation des Service Workers
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geöffnet');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch-Events abfangen für Offline-Funktionalität
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Lösche alten Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background Sync für Benachrichtigungen
self.addEventListener('sync', (event) => {
  if (event.tag === 'timer-notification') {
    event.waitUntil(
      // Hier können wir später Background-Benachrichtigungen implementieren
      Promise.resolve()
    );
  }
});

// Push-Benachrichtigungen (für zukünftige Erweiterungen)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Timer-Benachrichtigung',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Intervall-Timer', options)
  );
});