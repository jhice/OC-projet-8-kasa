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

---

# Passage à Next.js (App Router)

## Routes

| Page | Route | Fichier | Données |
|---|---|---|---|
| Accueil | `/` | `app/page.js` | API (9 logements) |
| Logement | `/logement/[id]` | `app/logement/[id]/page.js` | API, `notFound()` si 404 |
| À propos | `/a-propos` | `app/a-propos/page.js` | statique |
| 404 | toute URL inconnue | `app/not-found.js` | statique |
| Connexion | `/connexion` | `app/connexion/page.js` | API `POST /auth/login` |
| Favoris | `/favoris` | `app/favoris/page.js` | protégée ; API `GET /api/users/{id}/favorites` |

## Organisation

- CSS : copie de `intégration/css/` dans `app/ui/css/` ; globales importées dans `layout.js`, CSS de page importée par chaque page.
- `app/ui/nav-link.js` (client) : `aria-current` + classe active via `usePathname()`, fermeture du menu burger au clic.
- `app/ui/property-card.js` : props `titleLevel` (h3 accueil / h2 favoris) et `isFavorite`.
- `app/ui/property-gallery.js` (client) : vignettes dans l'ordre (photo affichée comprise, cadre intérieur rouge), clic = photo principale.
- `app/lib/api-bridge.js` : `apiListProperties()`, `apiGetProperty(id)`, erreurs `ApiError` avec `status`.
- Titres : modèle `Kasa — %s` dans le layout, `metadata` / `generateMetadata` par page.
- Images : `next/image` avec `sizes` (évite de servir du 3840px).

## Écarts avec l'intégration statique

- Header : « Ajouter un logement » (hors sprint) remplacé par **Connexion**, placé après Favoris / Messagerie (`.header__auth-link`). Bascule Connexion / Déconnexion à venir.
- Liens vers des pages absentes (messagerie, mot de passe oublié, inscription) neutralisés : `<a>` sans `href` (non focusable, `pointer-events: none`).
- Police : `--font-family` passe par `var(--font-inter-sans)` (nom généré par `next/font`).
- Prix réels (`price_per_night` de l'API).

## Connexion

Logique reprise du projet 7 (server action + zod + session `jose`), avec ajustements.

- `app/lib/definitions.js` : `SigninFormSchema` (zod 4, `trim()` avant `min(1)`, messages en français).
- `app/actions/auth.js` : `signin` (validation → `apiLogin` → `createSession` → redirection) et `logout`.
  - Erreurs renvoyées par champ (`z.flattenError`) ou globales (`form`) ; 401 de l'API → « Email ou mot de passe incorrect. ».
  - L'email saisi est renvoyé et réaffiché (`defaultValue`), jamais le mot de passe.
  - Redirection vers la page demandée (`?redirect=`), limitée aux chemins internes (`//…` et `/\…` refusés).
- `app/lib/session.js` : cookie `session` httpOnly, `sameSite=lax`, signé HS256 (`SESSION_SECRET` dans `.env.local`), 7 jours ; contient l'utilisateur et le token API.
- `proxy.js` : `/favoris` sans session → `/connexion?redirect=/favoris` ; `/connexion` avec session → `/`. La page favoris revérifie la session.
- `app/ui/login-form.js` (client) : `useActionState`, `noValidate` (messages zod uniquement), focus sur le premier champ en erreur, bouton désactivé pendant l'envoi.
- `app/ui/logout-button.js` (client) : formulaire POST vers la server action (pas de route GET `/logout`), referme le menu mobile.
- Header : Connexion / Déconnexion selon la session lue dans le layout → toutes les pages sont rendues à la requête (plus de données figées au build).
- Styles : `.field__input--invalid`, `.field__error`, `.form-error`, variable `--color-error`.
- Compte de test : `test@kasa.fr` / `P@ssword123`.

## Favoris

- `app/lib/favorites.js` (serveur) : `getFavorites()` / `getFavoriteIds()`, mis en cache par requête (`cache()` de React) ; `[]` si déconnecté.
- `app/actions/favorites.js` : `toggleFavorite(propertyId, favorite, currentPath)` → `POST` / `DELETE /api/properties/{id}/favorite` (idempotents), puis `refresh()` pour recharger la page.
  - Déconnecté → `/connexion?redirect=<page en cours>`.
- `app/ui/favorite-button.js` (client) : bascule immédiate avec `useOptimistic` (retour automatique à l'état serveur en cas d'échec), un seul envoi à la fois, erreur annoncée dans un `role="status"`.
- Accueil : cœurs pressés selon les favoris de l'utilisateur. Page favoris : liste réelle, carte retirée au clic, état vide (`.favorites__empty`).
- Pas de bouton favori sur la page logement (absent de la maquette).
- Token API refusé (401) :
  - dans une server action : suppression de la session puis connexion ;
  - dans un composant serveur (qui ne peut pas modifier les cookies) : redirection vers la route `app/session-expiree/route.js`, qui supprime le cookie puis redirige vers `/connexion`.
- `app/lib/safe-redirect.js` : contrôle des redirections internes, partagé entre connexion et favoris.

## Reste à faire

- Retour d'erreur visuel sur le bouton favori (aujourd'hui : cœur qui revient à son état + message pour lecteurs d'écran).
- Messagerie (fonctionnement à clarifier).
