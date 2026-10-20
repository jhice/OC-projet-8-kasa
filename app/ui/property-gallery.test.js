import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PropertyGallery from "./property-gallery";
import userEvent from "@testing-library/user-event";

/**
 * Tests de la galerie
 * - devrait afficher la galerie (vignette 1)
 * - devrait afficher la galerie (modale masquée)
 * - devrait afficher une image du slider
 * - devrait naviguer à droite et à gauche
 * - devrait gérer les bornes min et max
 * - devrait masquer la navigation si une seule image
 * - devrait fermer la modale
 */

/**
 * Images de test
 */
const pictures = [
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-4.jpg",
];

describe("gallery with carousel", () => {

  // affiche la galerie : vignette 2 présente
  it("devrait afficher la galerie (vignette 1)", () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // la première vignette...
    const button = screen.getByLabelText("Afficher la photo 2 sur 4");
    // ...doit être présente
    expect(button).toBeInTheDocument();
  });

  // affiche la galerie : modale masquée
  it("devrait afficher la galerie (modale masquée)", () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // la modale du slider...
    const slider = screen.getByTestId("gallery-slider");
    // doit être masquée
    expect(slider.className.includes("hidden")).toBeTruthy();
  });

  // affiche modale, affiche une image du slider
  it("devrait afficher une image du slider", async () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // au click sur la deuxième vignette...
    const button = screen.getByLabelText("Afficher la photo 2 sur 4");
    const user = userEvent.setup();
    await user.click(button);
    // la modale doit être visible
    const slider = screen.getByTestId("gallery-slider");
    expect(slider.className.includes("hidden")).toBeFalsy();
    // doit afficher en grand l'image 2
    const bigPicture = screen.getByTestId("big-picture");
    expect(bigPicture.alt).includes("photo 2 sur 4");
  });

  // navigue à droite, à gauche
  it("devrait naviguer à droite et à gauche", async () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // on clique sur la deuxième vignette
    const button = screen.getByLabelText("Afficher la photo 2 sur 4");
    const user = userEvent.setup();
    await user.click(button);
    // on navigue à droite => image 3
    const rightNavButton = screen.getByTestId("gallery-nav-right");
    await user.click(rightNavButton);
    const bigPicture = screen.getByTestId("big-picture");
    expect(bigPicture.alt).includes("photo 3 sur 4");
    // on navigue à gauche => image 2
    const leftNavButton = screen.getByTestId("gallery-nav-left");
    await user.click(leftNavButton);
    expect(bigPicture.alt).includes("photo 2 sur 4");
  });

  // boucle sur les bornes min et max
  it("devrait gérer les bornes min et max", async () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // on clique sur la première vignette
    const button = screen.getByAltText("Afficher la photo 1 sur 4");
    const user = userEvent.setup();
    await user.click(button);
    // on navigue à gauche => image 4
    const leftNavButton = screen.getByTestId("gallery-nav-left");
    await user.click(leftNavButton);
    const bigPicture = screen.getByTestId("big-picture");
    expect(bigPicture.alt).includes("photo 4 sur 4");
    // on navigue à droite => image 1
    const rightNavButton = screen.getByTestId("gallery-nav-right");
    await user.click(rightNavButton);
    expect(bigPicture.alt).includes("photo 1 sur 4");
  });

  // pas de navigation si une seule image
  it("devrait masquer la navigation si une seule image", async () => {
    const singlePicture = ["https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg"];
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={singlePicture} />);
    // on cible les boutons de navigation
    const leftNavButton = screen.getByTestId("gallery-nav-left");
    const rightNavButton = screen.getByTestId("gallery-nav-right");
    // ils contiennent la classe "hidden"
    expect(leftNavButton.className.includes("hidden")).toBeTruthy();
    expect(rightNavButton.className.includes("hidden")).toBeTruthy();
  });

  // ferme la modale
  it("devrait fermer la modale", async () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // on clique sur la première vignette
    const button = screen.getByLabelText("Afficher la photo 2 sur 4");
    const user = userEvent.setup();
    await user.click(button);
    // la modale du slider...
    const slider = screen.getByTestId("gallery-slider");
    // doit être visible
    expect(slider.className.includes("hidden")).toBeFalsy();
    // on cible le bouton "fermer"
    const closeButton = screen.getByTestId("gallery-nav-close");
    // la modale est masquée au click
    await user.click(closeButton);
    expect(slider.className.includes("hidden")).toBeTruthy();
  });

});