// ===== SERVICE WORKER — Clube dos Referidos =====
// Atualiza automaticamente quando o site é publicado no GitHub Pages

const CACHE_NAME = 'cdr-v1';

// Arquivos que ficam em cache para funcionar sem internet
const STATIC_ASSETS = [
  '/clube-dos-referidos/',
  '/clube-dos-referidos/index.html',
  '/clube-dos-referidos/dashboard.html',
  '/clube-dos-referidos/videoaulas.html',
  '/clube-dos-referidos/ebooks.html',
  '/clube-dos-referidos/arquivos.html',
  '/clube-dos-referidos/fotos.html',
  '/clube-dos-referidos/membros.html',
  '/clube-dos-referidos/sobre.html',
  '/clube-dos-referidos/css/global.css',
  '/clube-dos-referidos/js/auth.js',
  '/clube-dos-referidos/js/sidebar.js',
  '/clube-dos-referidos/js/supabase-config.js',
  '/clube-dos-referidos/js/data/videos.js',
  '/clube-dos-referidos/js/data/ebooks.js',
  '/clube-dos-referidos/js/data/arquivos.js',
  '/clube-dos-referidos/images/logo.png',
  '/clube-dos-referidos/images/emblema.png',
  '/clube-dos-referidos/images/gustavo-lima.jpg',
  '/clube-dos-referidos/images/juliana-daleva.jpg',
  '/clube-dos-referidos/images/icon-192.png',
  '/clube-dos-referidos/images/icon-512.png',
  '/clube-dos-referidos/CMS/data/content.json',
  '/clube-dos-referidos/manifest.json'
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
  if (!url.hostname.includes('github.io') && url.hostname !== location.hostname) {
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
