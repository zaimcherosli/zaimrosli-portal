const CACHE_NAME = 'zaimrosli-pwa-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/properties.html',
  '/property-detail.html',
  '/services.html',
  '/calculator.html',
  '/about.html',
  '/blog.html',
  '/testimonials.html',
  '/faq.html',
  '/contact.html',
  '/login.html',
  '/admin.html',
  '/styles.css',
  '/app.js',
  '/properties-data.js',
  '/manifest.json'
];

// Install Event — Pre-cache static shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching static app shell');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[PWA SW] Cache addAll warning:', err);
      });
    })
  );
});

// Activate Event — Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA SW] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Network-first for APIs, Cache-first for Static Shell
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // API Requests -> Network-first with cache fallback
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML & Static Assets -> Cache-first, update in background (Stale-While-Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
