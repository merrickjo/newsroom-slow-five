// Newsroom Slow Five service worker: app shell cache-first, editions network-first.
const SHELL = 'slowfive-shell-v1';
const DATA = 'slowfive-data-v1';
const SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => ![SHELL, DATA].includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Editions and the page itself: try network, fall back to cache.
  if (url.origin === location.origin && (url.pathname.includes('/editions/') || e.request.mode === 'navigate')) {
    const key = url.origin + url.pathname;
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(url.pathname.includes('/editions/') ? DATA : SHELL).then(c => c.put(key, copy)); }
        return res;
      }).catch(() => caches.match(key).then(r => r || caches.match('index.html')))
    );
    return;
  }
  // Everything else (fonts, icons): cache-first.
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(SHELL).then(c => c.put(e.request, copy)); }
    return res;
  })));
});
