import { getByRole, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FavoriteButton from "./favorite-button";

describe('favorite button', () => {
  
  // affiche le bouton
  // avec les props propertyId et isFavorite correctes
  it('devrait afficher le bouton', () => {
    render(<FavoriteButton />);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // l'état du bouton aria-pressed par défaut est correct, selon isFavorite

  // le toggle fonctionne
});