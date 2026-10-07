/**
 * Exécuté avant les routes listées dans config.matcher.
 * - route protégée sans session → /connexion?redirect=<page demandée>
 * - page de connexion avec session → accueil
 */

import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

// Une route protégée couvre aussi ses sous-pages (/messagerie → /messagerie/conversation)
const protectedRoutes = ["/favoris", "/messagerie"];
const authRoutes = ["/connexion"];

const isProtected = (pathname) =>
  protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

export default async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const session = await decrypt(request.cookies.get("session")?.value);

  if (isProtected(pathname) && !session?.userId) {
    const loginUrl = new URL("/connexion", request.nextUrl);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (authRoutes.includes(pathname) && session?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

// Uniquement les routes concernées (pas les assets ni les autres pages)
export const config = {
  matcher: ["/favoris", "/connexion", "/messagerie/:path*"],
};
