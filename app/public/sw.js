const CACHE = "todo-pwa-v1";
const ASSETS = [
    "/",                 // index.html
    "/manifest.webmanifest",
    "/sw.js",
    "/icon-192.png",
    "/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    // Cache-first for our assets, network fallback
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});
