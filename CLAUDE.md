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