import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./favorite-button";

// titleLevel : niveau du titre selon la page (h3 sur l'accueil, h2 dans les favoris)
export default function PropertyCard({ property, titleLevel = 3, isFavorite = false }) {
  const Title = `h${titleLevel}`;
  return (
    <>
      <li>
        <article className="card">
          <div className="card__media">
            <Image className="card__image" src={property.cover} width={1240} height={827} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" loading="lazy" />
            <FavoriteButton className="card__favorite" propertyId={property.id} title={property.title} isFavorite={isFavorite} />
          </div>
          <div className="card__body">
            <Title className="card__title"><Link className="card__link" href={`/logement/${property.id}`}>{property.title}</Link></Title>
            <p className="card__location">{property.location}</p>
            <p className="card__price"><span className="card__price-amount">{property.price_per_night}€</span>par nuit</p>
          </div>
        </article>
      </li>
    </>
  )
}