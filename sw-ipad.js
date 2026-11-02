const CACHE_NAME = "atlas-estimating-ipad-v1";
const CORE = [
  "./ipad.html",
  "./index.html",
  "./style.css",
  "./app.js",
  "./quantities.js",
  "./door-sketch.js",
  "./manifest.webmanifest",
  "./atlas-ipad-192.png",
  "./atlas-ipad-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache each asset independently so one optional/missing file
    // does not make the whole install fail.
    for (const url of CORE) {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await cache.put(url, response.clone());
      } catch (_) {}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("atlas-estimating-ipad-") && k !== CACHE_NAME)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        if (fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
        return fresh;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request)) ||
               (await cache.match("./ipad.html")) ||
               (await cache.match("./index.html"));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) {
      // Refresh quietly when a connection exists.
      fetch(request).then(response => {
        if (response.ok) cache.put(request, response.clone());
      }).catch(() => {});
      return cached;
    }

    try {
      const fresh = await fetch(request);
      if (fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
      return fresh;
    } catch (_) {
      return new Response("Offline", { status: 503, statusText: "Offline" });
    }
  })());
});
