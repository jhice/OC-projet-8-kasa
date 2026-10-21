"use client";

// Galerie du logement : photo principale + vignettes.
// un clic sur une image affiche un slider depuis l'image cliquée.

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";

/**
 * Galerie de photos d'une propriété
 * @param {string} title Titre du logement pour balise alt sur grande image
 * @param {array} pictures Liste des photos du logement
 * @returns 
 */
export default function PropertyGallery({ title, pictures }) {

  // index de l'image courante
  const [current, setCurrent] = useState(0);
  // grande image visible ou non
  const [bigPictureVisible, setBigPictureVisible] = useState(false);
  // état du fading des grandes images
  const [fading, setFading] = useState(false);
  // référence vers la grande image
  const bigPictureRef = useRef(null);
  // référence pour le prochain index d'image
  const nextIndexRef = useRef(null);
  // référence vers le bouton de fermeture (focus à l'ouverture)
  const closeButtonRef = useRef(null);
  // référence vers l'élément qui a ouvert la modale (focus rendu à la fermeture)
  const openerRef = useRef(null);

  // l'image reste masquée (fading) jusqu'au chargement d'une nouvelle photo ;
  // même photo qu'à la fermeture : pas de onLoad, on la réaffiche directement
  function openBigPicture(index) {
    openerRef.current = document.activeElement;
    setFading(index !== current);
    setCurrent(index);
    setBigPictureVisible(true);
  }

  // fondu de l'image avec la modale : à la réouverture, l'ancienne photo
  // ne reste pas visible pendant le chargement de la nouvelle
  function closeBigPicture() {
    setFading(true);
    setBigPictureVisible(false);
    // on rend le focus à la vignette qui a ouvert la modale
    openerRef.current?.focus?.();
  }

  // navigation clavier : flèches gauche / droite et Échap ;
  // useEffectEvent lit toujours la valeur à jour de current
  const handleKeyDown = useEffectEvent((e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (pictures.length > 1) {
          // pas de défilement de la page en arrière-plan
          e.preventDefault();
          previousPicture();
        }
        break;
      case "ArrowRight":
        if (pictures.length > 1) {
          e.preventDefault();
          nextPicture();
        }
        break;
      case "Escape":
        closeBigPicture();
        break;
    }
  });

  // écoute du clavier uniquement quand la grande image est affichée
  useEffect(() => {
    if (!bigPictureVisible) return;
    // focus sur le bouton de fermeture à l'ouverture
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [bigPictureVisible]);

  /**
   * Image précédente
   */
  function previousPicture() {
    if (current === 0) {
      changePicture(pictures.length - 1);
    } else {
      changePicture(current - 1);
    }
  }

  /**
   * Image suivante
   */
  function nextPicture() {
    if (current === pictures.length - 1) {
      changePicture(0);
    } else {
      changePicture(current + 1);
    }
  }

  // fondu vers 0 (CSS), puis changement d'image à la fin de la transition ;
  // le fondu vers 1 se fait au onLoad. Sans transition (mouvements réduits,
  // tests), on change d'image directement.
  function changePicture(index) {
    // on clible la grande image
    const picture = bigPictureRef.current;
    // on récupère sa durée de transition depuis son style CSS appliqué
    const duration = picture ? parseFloat(getComputedStyle(picture).transitionDuration) : 0;
    if (!duration) {
      // si pas de durée (reduced-motion par ex.), on change tout de suite l'image
      setCurrent(index);
      return;
    }
    // on stocke l'index de l'image pour usage ultérieur
    nextIndexRef.current = index;
    setFading(true);
  }

  // en fin de transition
  function handleTransitionEnd(e) {
    // si on fade sur l'opacité et qu'on a un prochain index d'image (pas close button)
    if (fading && e.propertyName === "opacity" && nextIndexRef.current !== null) {
      // on met à jour l'image
      setCurrent(nextIndexRef.current);
      // garde-fou pour s'assurer qu'on a cliqué sur les boutons de navigation
      nextIndexRef.current = null;
    }
  }

  return (
    <div className="gallery">

      {/* la première vignette */}
      <Image
        className="gallery__main"
        src={pictures[0]}
        alt={`Afficher la photo ${1} sur ${pictures.length}`}
        width={1240}
        height={827}
        sizes="(min-width: 768px) 50vw, 100vw"
        preload fetchPriority="high"
        onClick={() => openBigPicture(0)}
      />

      {/* la liste de vignettes, moins la première */}
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

      {/* modale */}
      <div
        className={"gallery__big " + (bigPictureVisible ? "" : "hidden")}
        role="dialog"
        aria-modal="true"
        aria-label={`Photos du logement ${title}`}
        data-testid="gallery-slider"
      >
        {/* ordre du DOM = ordre de tabulation : précédent, suivant, fermer ;
            les flèches sont en position absolue, la mise en page ne change pas */}

        {/* navigation image précédente */}
        <button
          type="button"
          aria-label="Image précédente"
          data-testid="gallery-nav-left"
          className={"gallery__big-navigation gallery__big-navigation--left button button--secondary" + (pictures.length > 1 ? "" : " hidden")}
          onClick={() => previousPicture()}
        >
          <span className="icon icon--back" aria-hidden="true"></span>
        </button>

        {/* navigation image suivante */}
        <button
          type="button"
          aria-label="Image suivante"
          data-testid="gallery-nav-right"
          className={"gallery__big-navigation gallery__big-navigation--right button button--secondary" + (pictures.length > 1 ? "" : " hidden")}
          onClick={() => nextPicture()}
        >
          <span className="icon icon--next" aria-hidden="true"></span>
        </button>

        {/* navigation fermer la modale */}
        <button
          ref={closeButtonRef}
          type="button"
          data-testid="gallery-nav-close"
          className="gallery__big-navigation--close button button--secondary"
          onClick={() => closeBigPicture()}
        >
          <span className="icon icon--close" aria-hidden="true"></span> Fermer
        </button>

        {/* la grande image dans la modale */}
        <Image
          ref={bigPictureRef}
          data-testid="big-picture"
          // classe de fading pour la transition
          className={"gallery__big-picture" + (fading ? " gallery__big-picture--fading" : "")}
          src={pictures[current]}
          alt={`${title} — photo ${current + 1} sur ${pictures.length}`}
          width={1240}
          height={827}
          sizes="(min-width: 768px) 50vw, 100vw"
          // fin de transition
          onTransitionEnd={handleTransitionEnd}
          // nouvelle image chargée (ou en erreur) : fondu vers 1
          onLoad={() => setFading(false)}
          onError={() => setFading(false)}
        />

      </div>
    </div>
  );
}
