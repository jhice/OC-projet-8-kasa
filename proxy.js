/**
 * Middleware qui se charge des autorisations sur les routes
 * Redirige vers la page de connexion si besoin
 */

import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

// Route protégées
const protectedRoutes = ["/favoris", "/messagerie"];
// Route de connexion
const authRoutes = ["/connexion"];

/**
 * Vérifie si la route est protégée
 * @param {string} pathname chemin demandé dans la requête HTTP
 * @returns {boolean}
 */
const isProtected = (pathname) =>
  protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

/**
 * Middleware appelé automatiquement par Next.js en début de cycle
 */
export default async function proxy(request) {
  // récupéraiton des paramètres de requête
  const { pathname, search } = request.nextUrl;
  // récupératipon de la session utilisateur
  const session = await decrypt(request.cookies.get("session")?.value);

  // route protégée et user non connecté
  if (isProtected(pathname) && !session?.userId) {
    // création d'une route avec paramètre d'URL pour revenir sur la page demadnée après login
    const loginUrl = new URL("/connexion", request.nextUrl);
    loginUrl.searchParams.set("redirect", pathname + search);
    // redirection vers le page de login
    return NextResponse.redirect(loginUrl);
  }

  // si on cherche à accéder à la page de login en étant connecté...
  if (authRoutes.includes(pathname) && session?.userId) {
    // ... on est redirigé vers la pge d'accueil
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // sinon, on continue vers la page demandée
  return NextResponse.next();
}

// On s'occupe uniquement des routes concernées (pas les assets ni les autres pages)
export const config = {
  matcher: ["/favoris", "/connexion", "/messagerie/:path*"],
};