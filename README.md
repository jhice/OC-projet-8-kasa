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

### Variables d'environnement

- Créer un fichier `.env.local` depuis le fichier `.env.example`.
- Renseigner un secret pour la session.
- Renseigner `dev` ou `prod` selon l'API que vous souhaitez utiliser.

## Démarrer le projet

Le backend est fourni [sur un autre dépôt](https://github.com/OpenClassrooms-Student-Center/dev-react-P12) :

- Afin de s'assurer que le serveur démarre sur le port 8000, modifier le script start comme ceci : `"start": "PORT=8000 node ./bin/www"`
- Démarrer le serveur API avec `npm start`

Ensuite démarrer le serveur de développement du projet frontend :

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

Le projet utilise les conventions *Next.js* et les fonctionnalités suivantes :

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

## Déploiement du frontend

> Sur Vercel

Le frontend est déployé à l'adresse : https://oc-projet-8-kasa-olive.vercel.app/

Identifiants de connexion : `test@kasa.fr` / `P@ssword123`

Pour créer un identifiant de connexion, utiliser la commande *cUrl* fournie sur le dépôt du backend. Sinon, utiliser la requête existante dans le dossier `docs/api.http` qui s'exécute avec l'extension [REST Client pour VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

```json
POST http://localhost:8000/auth/register
Content-Type: application/json

{
  "email": "test@kasa.fr",
  "name": "Utilisateur de test",
  "password": "P@ssword123"
}
```

## Déploiement du backend

> Sur Render

Le backend avec l'utilisateur de test a été déployé à l'adresse suivante : https://oc-kasa-backend.onrender.com

Utiliser ce même service ou celui de votre choix pour déployer l'API.