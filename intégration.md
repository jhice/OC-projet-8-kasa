# Intégration HTML/CSS — journal

Intégration statique des maquettes Figma (exports PNG) dans `intégration/`, avant le passage à Next.

## Conventions

- Mobile-first, 3 tailles : mobile (défaut, maquettes 390px), tablette `min-width: 768px`, desktop `min-width: 1024px` (maquettes 1440px).
- Nommage BEM (`.bloc__element--modificateur`).
- Police Inter (Google Fonts), palette et échelles en variables CSS.
- Icônes SVG appliquées en `mask` + `currentColor` : la couleur suit le texte.
  ⚠️ Les masques ne s'affichent pas en `file://` : servir le dossier (`python3 -m http.server`, Live Server…).

## Arborescence

```
intégration/
├── assets/
│   ├── icons/      SVG renommés (back, close, delete, heart, heart-filled, location, menu, message, plus, send, star*)
│   ├── images/     hero.jpg, a-propos-hero.webp, a-propos-mission.webp
│   └── logo/       logo-kasa.svg, logo-kasa-picto.svg
├── css/
│   ├── variables.css   palette, typo, espacements, rayons
│   ├── base.css        reset, styles globaux, lien d'évitement, reduced-motion
│   ├── components.css  composants de la planche Figma
│   ├── layout.css      structure de page, conteneur, hero, grille de cartes, header, menu mobile, footer
│   ├── home.css | property.css | about.css | error.css | login.css | favorites.css
├── gabarit.html        squelette commun (header + main + footer)
├── composants.html     page de démonstration des composants
├── index.html | logement.html | a-propos.html | 404.html | connexion.html | favoris.html
```

\* `star.svg` créée (absente des exports) ; `heart.svg` (contour) et `heart-filled.svg` (plein) dérivées de `Favoris.svg`.

## Étapes réalisées

1. **Composants** — variables (palette fournie), boutons (primaire, secondaire, icône, ghost), icônes, lien de navigation, lien texte, champs (input, textarea, avec action), case à cocher, tag, bouton favori, carte logement.
2. **Layout global** — header : barre + burger en mobile/tablette, carte flottante de 780px en desktop. Menu mobile plein écran via l'API Popover (sans JS). Footer.
3. **Accueil** — hero, grille de 12 cartes (1 / 2 / 3 colonnes), section « Comment ça marche ? ».
4. **Logement** — gabarit statique unique (logement `c67ab8a7`, `data-property-id` sur le `<main>`) : galerie (vignettes défilantes en mobile, mosaïque dès 768px), infos + tags, carte hôte (colonne de droite en desktop).
5. **À propos** — hero partagé avec l'accueil, section mission (grille texte / image en desktop).
6. **404** — « 404 » en Inter 800, deux boutons de retour.
7. **Log In** (`connexion.html`) — carte centrée, formulaire email / mot de passe.
8. **Favoris** — hero + grille de cartes, bouton favori actif (fond rouge, cœur blanc).

Blocs mutualisés en cours de route : `.container`, `.hero`, `.listings`, `.page__main--centered` (dans `layout.css`).

## Écarts assumés avec les maquettes

- Pas de maquette tablette : version 768px extrapolée (burger conservé, le header desktop ne tient pas).
- Bordure des champs `#8c8c8c` au lieu de `#F5F5F5` (contraste WCAG, voir `a11y.md`).
- Données réelles de `properties.json` (note, équipements) plutôt que celles de la maquette.
- 12 cartes sur toutes les tailles (la maquette mobile en montre 6).
- Page en cours mise en avant dans la navigation (absent de la maquette du menu mobile).

## À faire avec Next

- **Prix** : absents de `properties.json` (valeurs fictives 100–150 €) → ajouter un champ `price`.
- **Logement dynamique** : route par `id` (les cartes pointent vers `logement.html?id=…`).
- **Interactions** : bascule du favori (`aria-pressed`), changement de photo au clic sur une vignette.
- **Pages manquantes** : `messagerie.html` (fonctionnement à clarifier), `ajout-logement.html` et `inscription.html` (dossier « optionnel »).
- **Accès à la connexion** : aucun lien dans le header de la maquette, emplacement à définir.
- **Favoris vides** : état vide à concevoir.
- **Mot de passe oublié** : lien vers `#` pour l'instant.
