"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";

import { apiAddFavorite, apiRemoveFavorite } from "../lib/api-bridge";
import { getSession, deleteSession } from "../lib/session";
import { safeRedirectPath } from "../lib/safe-redirect";

/**
 * Ajoute ou retire un logement des favoris.
 * @param {string} propertyId
 * @param {boolean} favorite  état souhaité
 * @param {string} currentPath  page en cours, pour y revenir après connexion
 */
export async function toggleFavorite(propertyId, favorite, currentPath) {
  const loginUrl = `/connexion?redirect=${encodeURIComponent(safeRedirectPath(currentPath))}`;

  // Déconnecté : on passe par la connexion puis on revient sur la page
  const session = await getSession();
  if (!session) redirect(loginUrl);

  try {
    if (favorite) {
      await apiAddFavorite(propertyId, session.apiToken);
    } else {
      await apiRemoveFavorite(propertyId, session.apiToken);
    }
  } catch (error) {
    if (error.status === 401) {
      await deleteSession();
      redirect(loginUrl);
    }
    return { error: "Impossible de mettre à jour vos favoris, veuillez réessayer." };
  }

  // Recharge les données de la page (cœurs, liste des favoris)
  refresh();
  return { error: null };
}
