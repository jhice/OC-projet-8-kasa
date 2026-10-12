"use client";

// Galerie du logement : photo principale + vignettes.
// Les vignettes restent dans l'ordre (y compris la photo affichée) :
// un clic change la photo principale sans réorganiser la liste.

import { useState } from "react";
import Image from "next/image";

export default function PropertyGallery({ title, pictures }) {

  const [current, setCurrent] = useState(0);
  const [bigPictureVisible, setBigPictureVisible] = useState(false);

  function openBigPicture(index) {
    setCurrent(index);
    setBigPictureVisible(true);
  }

  function previousPicture() {
    if (current === 0) {
      setCurrent(pictures.length - 1);
    } else {
      setCurrent(current - 1);
    }
  }

  function nextPicture() {
    if (current === pictures.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

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
                onClick={() => openBigPicture(index)}
              >
                <Image className="gallery__thumb-image" src={picture} alt="" width={310} height={207} sizes="(min-width: 768px) 25vw, 84px" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={"gallery__big " + (bigPictureVisible ? '' : 'visually-hidden')}>
        <button
          className="gallery__big-navigation gallery__big-navigation--left"
          onClick={() => previousPicture()}
        >
          &lt;
        </button>
        <button
          className="gallery__big-navigation--close"
          onClick={() => setBigPictureVisible(false)}
        >
          Fermer
        </button>
        <Image
          className="gallery__big-picture"
          src={pictures[current]}
          alt={`${title} — photo ${current + 1} sur ${pictures.length}`}
          width={1240}
          height={827}
          sizes="(min-width: 768px) 50vw, 100vw"
          preload
        />
        <button
          className="gallery__big-navigation gallery__big-navigation--right"
          onClick={() => nextPicture()}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
