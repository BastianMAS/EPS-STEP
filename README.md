# Step EPS

Squelette de l'application Step pour l'EPS : bibliothèque de pas, créateur de chorégraphie, suivi des compétences élèves.

## Contenu
- `index.html` — l'application (menus, bibliothèque, créateur, compétences)
- `manifest.json` — rend l'appli installable sur l'écran d'accueil iPad (icône, mode plein écran)
- `service-worker.js` — précache l'appli pour qu'elle fonctionne hors ligne
- `icon-192.png` / `icon-512.png` — icônes de l'appli (placeholder à personnaliser si besoin)

## Statut
Les 41 vidéos sont intégrées et compressées (480p, h264, sans son, ~1,2 Mo au total pour l'ensemble — largement gérable en précache offline). Le service worker les précache automatiquement au premier chargement. Prochaine étape : ajout des nouveaux pas identifiés (voir bibliotheque_pas_step.xlsx, onglet "Pas à ajouter") à la rentrée.

## Ajouter un nouveau pas plus tard
1. Compresse la vidéo en mp4 480p (demande-moi de le faire si besoin)
2. Place-la dans `videos/pasXX.mp4` (XX = nouvel identifiant)
3. Ajoute une ligne dans le tableau `PAS` en haut du `<script>` d'`index.html`
4. Ajoute le nom du fichier dans la liste `PRECACHE_URLS` de `service-worker.js`

## Mise en ligne (GitHub Pages)
1. Crée un nouveau dépôt sur GitHub (ex. `step-eps`)
2. Depuis ce dossier :
   ```
   git init
   git add .
   git commit -m "Squelette initial de l'application Step"
   git branch -M main
   git remote add origin https://github.com/<ton-pseudo>/step-eps.git
   git push -u origin main
   ```
3. Sur GitHub : Settings → Pages → Source : branche `main`, dossier `/ (root)`
4. L'appli sera accessible à `https://<ton-pseudo>.github.io/step-eps/`
5. Sur l'iPad : ouvrir le lien dans Safari → bouton Partager → "Sur l'écran d'accueil" pour l'installer comme une vraie appli
