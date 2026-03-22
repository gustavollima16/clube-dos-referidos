// ===== SERVICE WORKER — Clube dos Referidos =====
// Atualiza automaticamente quando o site é publicado no GitHub Pages

const CACHE_NAME = 'cdr-v2';

// Arquivos que ficam em cache para funcionar sem internet
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/videoaulas.html',
  '/ebooks.html',
  '/arquivos.html',
  '/fotos.html',
  '/membros.html',
  '/sobre.html',
  '/css/global.css',
  '/js/auth.js',
  '/js/sidebar.js',
  '/js/supabase-config.js',
  '/js/data/videos.js',
  '/js/data/ebooks.js',
  '/js/data/arquivos.js',
  '/images/logo.png',
  '/images/emblema.png',
  '/images/gustavo-lima.jpg',
  '/images/juliana-daleva.jpg',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/CMS/data/content.json',
  '/manifest.json'
];

// ── INSTALL: guarda os arquivos no cache ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
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

// ── FETCH: estratégia por tipo de recurso ─────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignora requisições externas (Supabase, Google Fonts, etc.)
  if (url.hostname !== location.hostname) {
    return;
  }

  // HTML → Network First (garante conteúdo sempre atualizado)
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Demais assets → Cache First (rápido, atualiza em background)
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
      return cached || networkFetch;
    })
  );
});
