import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./favorite-button";

/**
 * Carte d'une propriété (home, favoris)
 * @param {object} property : objet qui contient les données de la propriété à afficher
 * @param {number} titleLevel : niveau du titre selon la page (h3 sur l'accueil, h2 dans les favoris)
 * @param {boolean} isFavorite : pour affichage icone de favoris (coeur vide ou plein)
 * @param {string} loadingType : lazy loading sur la home, pas sur les favoris
 * @returns JSX.Element
 */
export default function PropertyCard({ property, titleLevel = 3, isFavorite = false, loadingType = "lazy" }) {
  
  // élément de titre dynamique
  const Title = `h${titleLevel}`;

  return (
    <>
      <li itemScope itemType="https://schema.org/Product">
        <meta itemProp="name" content={property.title} />
        <meta itemProp="image" content={property.cover} />
        <article className="card" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <div className="card__media">
            <Image className="card__image" src={property.cover} width={1240} height={827} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" loading={loadingType} />
            <FavoriteButton className="card__favorite" propertyId={property.id} title={property.title} isFavorite={isFavorite} />
          </div>
          <div className="card__body">
            <Title className="card__title"><Link itemProp="url" className="card__link" href={`/logement/${property.id}/${property.slug}`}>{property.title}</Link></Title>
            <p className="card__location" itemScope itemType="https://schema.org/Organization"><span itemProp="location">{property.location}</span></p>
            <meta itemProp="priceCurrency" content="EUR" />
            <p className="card__price"><span className="card__price-amount" itemProp="price" content={property.price_per_night}>{property.price_per_night}€</span>par nuit</p>
          </div>
        </article>
      </li>
    </>
  );
}