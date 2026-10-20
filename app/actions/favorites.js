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
  
  // Si pas connecté, on redirige vers le login en transmettant la page demandée
  const loginUrl = `/connexion?redirect=${encodeURIComponent(safeRedirectPath(currentPath))}`;
  const session = await getSession();
  if (!session) {
    redirect(loginUrl);
  };

  // Tentative d'intervertir le logement
  try {
    if (favorite) {
      // ajoute
      await apiAddFavorite(propertyId, session.apiToken);
    } else {
      // retire
      await apiRemoveFavorite(propertyId, session.apiToken);
    }
  } catch (error) {
    // Si non connecté, redirection
    if (error.status === 401) {
      await deleteSession();
      redirect(loginUrl);
    }
    // Erreur générique
    return { error: "Impossible de mettre à jour vos favoris, veuillez réessayer." };
  }

  // Recharge les données de la page (icones, liste des favoris)
  refresh();
  return {
    error: null,
  };
}
