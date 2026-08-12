# Chantiflow — Application de bureau

## Ce que c'est

Une vraie application installable (icône sur le bureau, se lance comme un logiciel), qui affiche le site **https://www.chantiflow.fr** dans une fenêtre native — pas un onglet de navigateur.

**Important à comprendre** : ce n'est pas un logiciel "à part" avec son propre code — c'est le site lui-même, affiché différemment. Ça veut dire :
- Tout changement que tu fais dans Admin (thème, forfaits, services visibles...) apparaît **automatiquement** ici aussi, sans rien à faire de plus
- Le mécanisme d'abonnement fonctionne **déjà tout seul** — quelqu'un qui n'a pas payé voit exactement le même écran de blocage que sur le site
- Une **connexion internet est nécessaire**, comme pour le site

## Étape 1 — Installer les outils nécessaires (une seule fois)

1. Installe [Node.js](https://nodejs.org) si ce n'est pas déjà fait (version 18 ou plus)
2. Ouvre PowerShell dans le dossier `chantiflow-desktop` (celui qui contient ce fichier)
3. Installe les dépendances :
```powershell
npm install
```

## Étape 2 — Tester avant de construire l'installateur

```powershell
npm start
```
Une fenêtre doit s'ouvrir avec le site Chantiflow dedans. Ferme-la une fois que tu as vérifié que ça fonctionne.

## Étape 3 — Construire le vrai fichier d'installation

Selon le système pour lequel tu veux créer l'installateur :

**Windows** (crée un fichier .exe d'installation) :
```powershell
npm run build-win
```

**Mac** :
```powershell
npm run build-mac
```

Le fichier installable apparaît ensuite dans un nouveau dossier `dist/`.

## Étape 4 — Distribuer aux gens

Envoie-leur simplement le fichier `.exe` (ou `.dmg` pour Mac) trouvé dans `dist/` — ils double-cliquent, installent, et l'icône Chantiflow apparaît sur leur bureau/menu démarrer, comme n'importe quel logiciel.

## À propos de l'icône

J'ai mis une icône simple ("C" doré sur fond sombre) dans `build/icon.png`. Si tu as un vrai logo, remplace ce fichier par le tien (512×512 pixels recommandé) avant de lancer la construction — pour Windows, il faudra aussi une version `.ico` (tu peux convertir ton PNG en .ico gratuitement sur des sites comme [icoconvert.com](https://icoconvert.com)).

## Une question à te poser avant de distribuer largement

Les installateurs Windows non signés (sans certificat payant, ~200-400€/an) déclenchent souvent un avertissement Windows Defender "Éditeur inconnu" au premier lancement — gênant mais pas bloquant (un clic "Plus d'infos → Exécuter quand même" suffit). Pour un usage entre proches, c'est généralement acceptable ; pour une vraie distribution publique, la signature de code est recommandée à terme.

---

Si tu bloques à une étape précise, dis-le-moi avec ce que tu vois exactement à l'écran, comme d'habitude.
