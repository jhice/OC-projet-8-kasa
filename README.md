# Projet Kasa

## Pré-requis pour l'installation

- Node.js (version LTS)
- Un gestiionnaire de paquets Node.js : npm, yarn, pnpm ou bun

## Installation

- Clonez ce dépôt en local
- Rendez-vous dans le dossier cloné
- Lancez la commande d'installation :

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

## Démarrer le projet

Le back-end est fourni [sur un autre dépôt]() :

- Afin de s'assurer que le serveur démarre sur le port 8000, modifier le script start comme ceci : `"start": "PORT=8000 node ./bin/www"`
- Démarrer le serveur API avec `npm start`

Ensuite démarrer le serveur de développement du projet :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur. Vous devriez arriver sur la page de connexion :tada:

## Description du projet

Le projet utilise les conventions Next.js et les fonctionnalités suivantes :

- App Router
- Server Actions
- Session serveur
- JWT en cookie HttpOnly pour l'identification client

Le projet est en cours de réalisation ([Sprint 1 du backlog](https://app.notion.com/p/openclassrooms/Product-Backlog-et-sp-cifications-techniques-pour-le-site-de-Kasa-25d484f1fa6180c7924beb3ae178fa58)).

L'utilisateur peut naviguer sur le site librement mais doit se connecter pour gérer ses favoris.

Deux tests sont réalisés :

- Composant bouton de mise en favori (icône *coeur* sur les vignettes)
- Composant de la galerie

### Stack logicielle

- Next.js (interface entre le frontend et le backend)
- React (frontend)
- Jose (manipulation JWT)
- Zod (validation des formulaires)
- ESLint (qualité du code)
- Vitest (tests unitaires)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
