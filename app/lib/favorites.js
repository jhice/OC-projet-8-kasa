import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";

import { getSession } from "./session";
import { apiListFavorites } from "./api-bridge";

// Favoris de l'utilisateur connecté ([] si déconnecté).
// cache() : un seul appel API par requête, même si plusieurs composants le demandent.
export const getFavorites = cache(async () => {
  const session = await getSession();
  if (!session) return [];

  try {
    return await apiListFavorites(session.userId, session.apiToken);
  } catch (error) {
    // Token API refusé (secret changé, utilisateur supprimé…) : on vide la session.
    // Un composant serveur ne peut pas modifier les cookies → route dédiée.
    if (error.status === 401) redirect("/session-expiree");
    throw error;
  }
});

export async function getFavoriteIds() {
  const favorites = await getFavorites();
  return new Set(favorites.map((property) => property.id));
}
