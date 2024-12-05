// el service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker: Install');
    event.waitUntil(
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/Java/Script.js',
          '/Java/manifest.js',
          '/css/Styles.css',
          '/img/Art_sTRAY-ico.ico',
          '/img/favicon1.png',
          '/img/modelo%201.jpeg',
          '/img/modelo%202.jpeg',
          '/img/modelo%203.jpeg',
          '/img/modelo%204.jpg',
          '/img/pagina%203.png',
          '/img/pagina%20web.png',
          '/img/pagina%20web2.png',
          '/img/programa%201.png',
          '/img/screenshot.png',
          '/img/video-modelo.png',
        ]).catch((error) => {
        });
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['static-cache-v1'];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          if (event.request.destination === 'image') {
            return caches.match('/img/screenshot.png');
          }
        });
      })
    );
  });
  
