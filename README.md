# Step EPS

Squelette de l'application Step pour l'EPS : bibliothèque de pas, créateur de chorégraphie, suivi des compétences élèves.

## Contenu
- `index.html` — l'application (menus, bibliothèque, créateur, compétences)
- `manifest.json` — rend l'appli installable sur l'écran d'accueil iPad (icône, mode plein écran)
- `service-worker.js` — précache l'appli pour qu'elle fonctionne hors ligne
- `icon-192.png` / `icon-512.png` — icônes de l'appli (placeholder à personnaliser si besoin)

## Statut
Vidéos non encore intégrées (placeholders). Prochaine étape : recompression des 41 vidéos extraites + intégration, prévue à la rentrée.

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
