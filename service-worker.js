const CACHE_NAME = "step-eps-v9";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./logo-sidebar.png",
  "./signature-logo.png",
  "./videos/01_Basic.mp4",
  "./videos/02_Jog.mp4",
  "./videos/03_Pendulum.mp4",
  "./videos/04_V_Step.mp4",
  "./videos/05_V_step_saute.mp4",
  "./videos/06_V_step_bloque.mp4",
  "./videos/07_Reverse_turn.mp4",
  "./videos/08_Across.mp4",
  "./videos/09_Across_chasse.mp4",
  "./videos/10_Revolving_door.mp4",
  "./videos/11_Revolving_chasse.mp4",
  "./videos/12_Basic_Cheval.mp4",
  "./videos/13_Cheval_chasse.mp4",
  "./videos/14_Genou_cheval.mp4",
  "./videos/15_Dobble_lunge_side.mp4",
  "./videos/16_T_step.mp4",
  "./videos/17_Lunge_side_demi_tour.mp4",
  "./videos/18_Jazz_square.mp4",
  "./videos/19_Box_step.mp4",
  "./videos/20_Pivot_turn.mp4",
  "./videos/21_Tap_up.mp4",
  "./videos/22_Pony.mp4",
  "./videos/23_Genou_simple.mp4",
  "./videos/24_3_Genoux_repeat.mp4",
  "./videos/25_Knee_up_twist.mp4",
  "./videos/26_Knee_up_ciseaux.mp4",
  "./videos/27_Genou_L.mp4",
  "./videos/28_Genou_L_tape_derriere.mp4",
  "./videos/29_Genou_L_touche_step.mp4",
  "./videos/30_Kick_simple.mp4",
  "./videos/31_Kick_impulsion.mp4",
  "./videos/32_Heel_up_simple.mp4",
  "./videos/33_Heel_up_impulsion.mp4",
  "./videos/34_Back_lift_simple.mp4",
  "./videos/35_Side_lift_simple.mp4",
  "./videos/36_Lunge_side.mp4",
  "./videos/37_Mambo_chasse.mp4",
  "./videos/38_Kick_repeat.mp4",
  "./videos/39_Heel_up_repeat.mp4",
  "./videos/40_Back_lift_repeat.mp4",
  "./videos/41_Side_lift_repeat.mp4",
  "./posters/01_Basic.jpg",
  "./posters/02_Jog.jpg",
  "./posters/03_Pendulum.jpg",
  "./posters/04_V_Step.jpg",
  "./posters/05_V_step_saute.jpg",
  "./posters/06_V_step_bloque.jpg",
  "./posters/07_Reverse_turn.jpg",
  "./posters/08_Across.jpg",
  "./posters/09_Across_chasse.jpg",
  "./posters/10_Revolving_door.jpg",
  "./posters/11_Revolving_chasse.jpg",
  "./posters/12_Basic_Cheval.jpg",
  "./posters/13_Cheval_chasse.jpg",
  "./posters/14_Genou_cheval.jpg",
  "./posters/15_Dobble_lunge_side.jpg",
  "./posters/16_T_step.jpg",
  "./posters/17_Lunge_side_demi_tour.jpg",
  "./posters/18_Jazz_square.jpg",
  "./posters/19_Box_step.jpg",
  "./posters/20_Pivot_turn.jpg",
  "./posters/21_Tap_up.jpg",
  "./posters/22_Pony.jpg",
  "./posters/23_Genou_simple.jpg",
  "./posters/24_3_Genoux_repeat.jpg",
  "./posters/25_Knee_up_twist.jpg",
  "./posters/26_Knee_up_ciseaux.jpg",
  "./posters/27_Genou_L.jpg",
  "./posters/28_Genou_L_tape_derriere.jpg",
  "./posters/29_Genou_L_touche_step.jpg",
  "./posters/30_Kick_simple.jpg",
  "./posters/31_Kick_impulsion.jpg",
  "./posters/32_Heel_up_simple.jpg",
  "./posters/33_Heel_up_impulsion.jpg",
  "./posters/34_Back_lift_simple.jpg",
  "./posters/35_Side_lift_simple.jpg",
  "./posters/36_Lunge_side.jpg",
  "./posters/37_Mambo_chasse.jpg",
  "./posters/38_Kick_repeat.jpg",
  "./posters/39_Heel_up_repeat.jpg",
  "./posters/40_Back_lift_repeat.jpg",
  "./posters/41_Side_lift_repeat.jpg",
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

// Cache-first pour les vidéos et vignettes (poids fixe, jamais modifiées) ; network-first pour le reste
self.addEventListener("fetch", (event) => {
  const isAsset = event.request.url.endsWith(".mp4") || event.request.url.endsWith(".jpg");
  if (isAsset) {
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
