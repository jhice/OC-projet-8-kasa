import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FavoriteButton from "./favorite-button";
import userEvent from "@testing-library/user-event";

// promesse vide pour simuler l'attente de l'API favorites (et tester optimistic)
vi.mock("../actions/favorites", () => ({ toggleFavorite: () => new Promise(() => {}) }));
// interception navigation (sans router Next)
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe('favorite button', () => {

  // affiche le bouton,
  it('devrait afficher le bouton', () => {
    render(<FavoriteButton propertyId="1" title="Test" isFavorite={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  // affiche le bouton,
  // avec les props propertyId et isFavorite correctes
  it('devrait afficher le bouton avec ses propriétés par défaut', () => {
    render(<FavoriteButton propertyId="1" title="Test" isFavorite={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // l'état du bouton aria-pressed par défaut est correct, selon isFavorite
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  // le toggle fonctionne
  it('devrait inverser l\'état du aria-pressed du bouton', async () => {
    render(<FavoriteButton propertyId="1" title="Test" isFavorite={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // on toggle, l'état de aria-pressed doit changer
    const user = userEvent.setup()
    await user.click(button);
    // console.log(button.ariaPressed);
    expect(button).toHaveAttribute("aria-pressed", "false");    
  });

});