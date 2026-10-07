"use client";

// Galerie du logement : photo principale + vignettes.
// Les vignettes restent dans l'ordre (y compris la photo affichée) :
// un clic change la photo principale sans réorganiser la liste.

import { useState } from "react";
import Image from "next/image";

export default function PropertyGallery({ title, pictures }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="gallery">
      <Image
        className="gallery__main"
        src={pictures[current]}
        alt={`${title} — photo ${current + 1} sur ${pictures.length}`}
        width={1240}
        height={827}
        sizes="(min-width: 768px) 50vw, 100vw"
        preload
      />
      {pictures.length > 1 && (
        <ul className="gallery__thumbs" role="list" aria-label="Photos du logement">
          {pictures.map((picture, index) => (
            <li className="gallery__thumb" key={picture}>
              <button
                className={index === current ? "gallery__thumb-button gallery__thumb-button--active" : "gallery__thumb-button"}
                type="button"
                aria-label={`Afficher la photo ${index + 1} sur ${pictures.length}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => setCurrent(index)}
              >
                <Image className="gallery__thumb-image" src={picture} alt="" width={310} height={207} sizes="(min-width: 768px) 25vw, 84px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
