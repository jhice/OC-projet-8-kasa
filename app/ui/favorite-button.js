"use client";

// Bouton favori : bascule immédiate (useOptimistic), puis server action.
// En cas d'échec, l'état revient tout seul à la valeur du serveur.

import { useOptimistic, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

import { toggleFavorite } from "../actions/favorites";

export default function FavoriteButton({ propertyId, title, isFavorite, className = "" }) {
  const pathname = usePathname();
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleClick() {
    // Un seul envoi à la fois (évite les requêtes croisées sur double clic)
    if (isPending) return;
    const nextFavorite = !optimisticFavorite;

    startTransition(async () => {
      setError("");
      setOptimisticFavorite(nextFavorite);
      const result = await toggleFavorite(propertyId, nextFavorite, pathname);
      if (result?.error) setError(result.error);
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
      >
        <span className="icon icon--heart-filled" aria-hidden="true"></span>
      </button>
      {/* Message d'erreur annoncé aux lecteurs d'écran */}
      <span className="visually-hidden" role="status">{error}</span>
    </>
  );
}
