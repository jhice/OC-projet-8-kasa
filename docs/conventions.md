# Conventions de code

## Fichiers

- `kebab-case` (doc de Next.js)

## Variables, fonctions

Nommés selon leur rôle, en `camelCase`, par ex. :

- server action : `signIn()` dans fichier `app/actions/auth.js`
- server action : `toggleFavorite()` dans fichier `app/actions/favorites.js`
- appel API : `apiListProperties()` dans fichier `app/lib/api-bridge.js`
- récupération de la session : `getSession()` dans fichier `app/lib/session.js`

## Composants React (fonctions)

Nommés selon leur rôle, en `PascalCase`, par ex., pour la page d'accueil :

- `RootLayout`
  - `Home`
    - `PropertyCard`

## Commentaires

- *JSDoc* partout.
- Dans le code source si besoin ou de manière systématique.

## ESLint

- Point-virgule en fin d'instruction.
- Double quotes pour les chaines de caractères.
- Pas de variables non utilisées.
- `npm run lint`
- `npm run lint:fix`