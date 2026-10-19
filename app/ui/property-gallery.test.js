import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PropertyGallery from "./property-gallery";
import userEvent from "@testing-library/user-event";

const pictures = [
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-4.jpg",
];

describe("gallery with carousel", () => {

  // affiche la galerie : vignette 1 présente
  it("devrait afficher la galerie (vignette 1)", () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // la première vignette...
    const button = screen.getByLabelText("Afficher la photo 1 sur 4");
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

  // affiche une image du slider
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

  // affiche la modale
  it("devrait afficher le bouton de fermeture", () => {
    // affiche le composant galerie
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    const button = screen.getAllByRole("navigation");
    // bouton "fermer" présent
    expect(button[1]).toBeInTheDocument();
    expect(button[1].textContent).toBe("Fermer");
  });

});