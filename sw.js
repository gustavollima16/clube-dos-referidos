// ===== SERVICE WORKER — Clube dos Referidos =====
// Atualiza automaticamente quando o site é publicado no GitHub Pages

const CACHE_NAME = 'cdr-v5';

// Apenas imagens ficam em cache (não mudam com frequência)
const IMAGE_ASSETS = [
  '/images/logo.png',
  '/images/emblema.png',
  '/images/gustavo-lima.jpg',
  '/images/juliana-daleva.jpg',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/apple-touch-icon.png'
];

// ── INSTALL: guarda só imagens no cache ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(IMAGE_ASSETS).catch(err => {
        console.warn('[SW] Alguns arquivos não puderam ser cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: remove caches antigos ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: Network First para tudo, Cache First só para imagens ───────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignora requisições externas (Supabase, Google Fonts, etc.)
  if (url.hostname !== location.hostname) {
    return;
  }

  // Imagens → Cache First (não mudam com frequência)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML, CSS, JS, JSON → Network First (sempre atualizado)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
