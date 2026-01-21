/* ===============================
   SERVICE WORKER
   Quiz Master ∞
================================ */

const CACHE_NAME = 'quiz-master-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',

  // CSS
  './assets/css/base.css',
  './assets/css/layout.css',
  './assets/css/components.css',
  './assets/css/animations.css',
  './assets/css/theme.css',

  // JS
  './assets/js/main.js',
  './assets/js/engine.js',
  './assets/js/ui.js',
  './assets/js/timer.js',
  './assets/js/audio.js',
  './assets/js/story.js',
  './assets/js/personality.js',
  './assets/js/adaptive.js',

  // Data
  './assets/data/questions.js'
];

/* Install */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

/* Activate */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* Fetch */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => caches.match('./index.html'))
  );
});
