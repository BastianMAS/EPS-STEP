const CACHE_NAME = "step-eps-v2";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./logo-sidebar.png",
  "./videos/pas1.mp4",
  "./videos/pas2.mp4",
  "./videos/pas3.mp4",
  "./videos/pas4.mp4",
  "./videos/pas5.mp4",
  "./videos/pas6.mp4",
  "./videos/pas7.mp4",
  "./videos/pas8.mp4",
  "./videos/pas9.mp4",
  "./videos/pas10.mp4",
  "./videos/pas11.mp4",
  "./videos/pas12.mp4",
  "./videos/pas13.mp4",
  "./videos/pas14.mp4",
  "./videos/pas15.mp4",
  "./videos/pas16.mp4",
  "./videos/pas17.mp4",
  "./videos/pas18.mp4",
  "./videos/pas19.mp4",
  "./videos/pas20.mp4",
  "./videos/pas21.mp4",
  "./videos/pas22.mp4",
  "./videos/pas23.mp4",
  "./videos/pas24.mp4",
  "./videos/pas25.mp4",
  "./videos/pas26.mp4",
  "./videos/pas27.mp4",
  "./videos/pas28.mp4",
  "./videos/pas29.mp4",
  "./videos/pas30.mp4",
  "./videos/pas31.mp4",
  "./videos/pas32.mp4",
  "./videos/pas33.mp4",
  "./videos/pas34.mp4",
  "./videos/pas35.mp4",
  "./videos/pas36.mp4",
  "./videos/pas37.mp4",
  "./videos/pas38.mp4",
  "./videos/pas39.mp4",
  "./videos/pas40.mp4",
  "./videos/pas41.mp4",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first pour les vidéos (poids fixe, jamais modifiées) ; network-first pour le reste
self.addEventListener("fetch", (event) => {
  const isVideo = event.request.url.endsWith(".mp4");
  if (isVideo) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
