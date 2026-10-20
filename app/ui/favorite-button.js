"use client";

// Bouton favori : bascule immédiate (useOptimistic), puis server action.
// En cas d'échec, l'état revient tout seul à la valeur du serveur.

import { useOptimistic, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

import { toggleFavorite } from "../actions/favorites";

/**
 * Bouton des favoris sur la carte propriété (composant client)
 * @returns Promise<JSX.Element>
*/
export default function FavoriteButton({ propertyId, title, isFavorite, className = "" }) {
  const pathname = usePathname();
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  /**
   * Gestionnaire de click sur l'icone de favori
   */
  function handleClick() {
    // Un seul envoi à la fois (évite les requêtes croisées sur double clic)
    if (isPending) {
      return;
    };
    // On se prépare à toggle le favori
    const nextFavorite = !optimisticFavorite;

    // on encapsule l'appel API dans une transition (permet de décaler la mise à jour du state et d'utiliser isPending)
    startTransition(async () => {
      setError("");
      setOptimisticFavorite(nextFavorite);
      const result = await toggleFavorite(propertyId, nextFavorite, pathname);
      if (result?.error) {
        setError(result.error);
      };
    });
  }

  return (
    <>
      <button
        className={`favorite-button ${className}`}
        type="button"
        aria-pressed={optimisticFavorite}
        aria-label={`Favori : ${title}`}
        onClick={handleClick}
        role="button"
      >
        <span className="icon icon--heart-filled" aria-hidden="true"></span>
      </button>
      {/* Message d'erreur annoncé aux lecteurs d'écran */}
      <span className="visually-hidden" role="status">{error}</span>
    </>
  );
}
