"use client";

import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <>
      <li>
        <article className="card">
          <div className="card__media">
            <Image className="card__image" src={property.cover} width={1240} height={827} alt="" loading="lazy" />
            <button className="favorite-button card__favorite" type="button" aria-pressed="false" aria-label="Favori : Appartement cosy">
              <span className="icon icon--heart-filled" aria-hidden="true"></span>
            </button>
          </div>
          <div className="card__body">
            <h3 className="card__title"><a className="card__link" href="logement.html?id=c67ab8a7">{property.title}</a></h3>
            <p className="card__location">{property.location}</p>
            <p className="card__price"><span className="card__price-amount">100€</span>par nuit</p>
          </div>
        </article>
      </li>
    </>
  )
}