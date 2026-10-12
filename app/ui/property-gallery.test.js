import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PropertyGallery from "./property-gallery";

const pictures = [
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg",
  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-4.jpg",
];

describe('gallery with carousel', () => {

  // affiche la galerie (test vignette 1)
  it('devrait afficher la galerie (vignette 1)', () => {
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    // label de la première vignette
    const button = screen.getByLabelText("Afficher la photo 1 sur 4")
    expect(button).toBeInTheDocument();
  });

  // affiche la modale
  it('devrait afficher le bouton de fermeture', () => {
    render(<PropertyGallery title="Titre de la photo" pictures={pictures} />);
    const button = screen.getAllByRole("navigation");
    // bouton "fermer" présent
    expect(button[1]).toBeInTheDocument();
    expect(button[1].textContent).toBe("Fermer");
  });

});