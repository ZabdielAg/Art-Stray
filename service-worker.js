// el service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker: Install');
    event.waitUntil(
      caches.open('static-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          'Java/Script.js',
          'Java/manifest.js',
          'css/Styles.css',
          'img/Art_sTRAY-ico.ico',
          'img/favicon1.png',
          'img/modelo 1.jpeg',
          'img/modelo 2.jpeg',
          'img/modelo 3.jpeg',
          'img/modelo 4.jpg',
          'img/pagina 3.png',
          'img/pagina web.png',
          'img/pagina web2.png',
          'img/programa 1.png',
          'img/screenshot.png',
          'img/video-modelo.png',


        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  