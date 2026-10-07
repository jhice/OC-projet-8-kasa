@AGENTS.md

# 1. Intégration HTML/CSS

- depuis des exports Figma
- les sources se trouvent dans ce dossier : /home/jhice/Documents/Formation/Projets OCR/kasa/maquettes
- les fichiers HTML/CSS seront exportés dans le dossier intégration/ du projet courant
- un page de composants existe, il faut s'appuyer dessus, pour créer
  - une CSS avec les différents composants
  - des variables pour la palette de couleurs
- inspire-toi de la syntaxe CSS BEM pour nommer les composants, puis le reste de l'intégration
- faire du mobile-first puis 3 tailles d'écran : mobile, tablette, desktop

## Etapes possibles

1. création de la feuille de style des composants
2. création du layout global header (menu burger) + footer
3. intégration de la page d'accueil avec la css des composants
   1. ajout de CSS spécifiques à la page d'accueil
4. intégration de la page logement
5. intégration de la page à propos
6. intégration de la page 404
7. intégration de la page log in
8. intégration de la page favoris

## Messagerie

- on en reparle après, j'ai besoin de clarifier son fonctionnement

## Réponses pour Claude

### Les exports sont des PNG, pas du code Figma

- Main red : #99331A
- Dark orange : #842C16
- Light orange : #FFFBF9
- Noir : #0D0D0D
- Blanc : #FFFFFF
- Gris light : #F5F5F5
- Gris dark : #565656
- Police de caractères : Inter (partout)

### Il n'y a pas de maquette tablette

- adapte une version tablette pour une largeur de 768px

### Il manque les images et icônes

- les photos des logements sont des urls sur amazons, tu les trouveras dans le fichier properties.json avec toutes les infos nécessaires aux propriétés, si besoin pour les pages
- dossier "icones et logo SVG"
  - logo exporté en SVG (version texte + icône seule)
  - icônes exportées en SVG

### Petites questions

- format : HTML/CSS statique, on fera l'intégration next ensuite
- favoris : le fichier a été renommé "mobile" pour plus de compréhension"
- dossier "optionnel" : on met de côté pour le moment
- numérotation : il y a bien 8 étapes maintenant

## Accessibilité

- pendant l'intégration, mettre en place les notions d'accessibilité web de base :
  - balises ARIA
  - balises alt sur les images
  - vérifier les contrastes (dans la mesure du possible)

# 2. Intégration des pages sous Next.js

## Objectifs

- créer les pages dans le dossier app/ (App Router)
  - basé sur les intégrations présentes dans le dossier intégration/
  - app/layout.js déjà présent avec son {children}
  - le HTML à reprendre des les .html correspond à la balise main
  - forme app/property/page.js
  - le cas échéant ajouter l'appel API dans app/lib/api-bridge.js
    - voir la fonction existante apiListProperties() et apiUserUpdate(userData, token) qui est commentée
  - l'API est lancée (si ce n'est pas le cas dis-moi)
- créer les liens de navigation via Link

## Pages Next à créer

1. la page logement
   1. app/property/page.js
   2. API vers la propriété et son id
2. la page à propos
   1. app/about/page.js
   2. pas de requête API
3. la page 404
   1. page 404 à créer à la façon Next.js
4. la page log in
   1. app/login/page.js
   2. appel API à traiter dans un second temps
5. la page favoris
   1. app/favorites/page.js
   2. appel API à traiter dans un second temps
