import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <>
      <li>
        <article className="card">
          <div className="card__media">
            <Image className="card__image" src={property.cover} width={1240} height={827} alt="" loading="lazy" />
            <button className="favorite-button card__favorite" type="button" aria-pressed="false" aria-label={`Favori : ${property.title}`}>
              <span className="icon icon--heart-filled" aria-hidden="true"></span>
            </button>
          </div>
          <div className="card__body">
            <h3 className="card__title"><Link className="card__link" href={`/logement/${property.id}`}>{property.title}</Link></h3>
            <p className="card__location">{property.location}</p>
            <p className="card__price"><span className="card__price-amount">{property.price_per_night}€</span>par nuit</p>
          </div>
        </article>
      </li>
    </>
  )
}