// service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
  event.waitUntil(
    caches.open('static-cache-v1')  // Usa un nombre versionado para el caché
      .then((cache) => {
        return cache.addAll([
          '/',  // Raíz del sitio
          'index.html',
          '/Java/Script.js',
          '/Java/manifest.json',
          'css/Styles.css',
          '/img/Art_sTRAY-ico.ico',
          '/img/favicon1.png',
          '/img/favicon2.png',
          '/img/favicon3.png',
          '/img/foto de mi.jpg',
          '/img/modelo 1.jpeg',
          '/img/modelo 2.jpeg',
          '/img/modelo 3.jpeg',
          '/img/modelo 4.JPG',
          '/img/pagina 3.png',
          '/img/pagina web.png',
          '/img/pagina web2.png',
          '/img/programa 1.png',
          '/img/screenshot.png',
          '/img/video-modelo.png',
        ]);
      })
      .catch((err) => {
        console.error('Error al cargar archivos en caché:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== 'static-cache-v1') {
            console.log('Service Worker: Eliminando caché antiguo:', cache);
            return caches.delete(cache); // Limpia versiones antiguas
          }
        })
      );
    }).then(() => self.clients.claim()) // Asegura que este SW controle las pestañas activas
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Si hay respuesta en caché, úsala
      }

      // Si no está en caché, realiza la petición de red
      return fetch(event.request).catch(() => {
        // Si la petición de red falla, retorna el archivo de respaldo (index.html)
        if (event.request.destination === 'document') {
          return caches.match('/index.html'); // Página de respaldo
        }
      });
    })
  );
});
