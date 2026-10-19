import "../../ui/css/property.css";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PropertyGallery from "../../ui/property-gallery";
import { apiGetProperty } from "../../lib/api-bridge";

// Logement introuvable (404 de l'API) → page 404 de Next
async function getProperty(id) {
  try {
    return await apiGetProperty(id);
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
}

/**
 * Metadata dynamique en fonction du logement affiché
 * @param {string} slug Le slug de la propriété
 * @returns 
 */
export async function generateMetadata({ params }) {
  // { slug: [ '0979876d', 'appartement-de-standing-10e' ] }
  const { slug } = await params;
  const id = slug[0];
  const property = await getProperty(id);

  return {
    title: property.title,
    description: property.description,
  };
}

export default async function PropertyPage({ params }) {
  // { slug: [ '0979876d', 'appartement-de-standing-10e' ] }
  const { slug } = await params;
  const id = slug[0];
  const property = await getProperty(id);

  return (
    <main id="contenu" tabIndex="-1" className="page__main container property">
      <div className="property__back">
        <Link className="button button--secondary button--with-icon" href="/">
          <span className="icon icon--back" aria-hidden="true"></span>Retour aux annonces
        </Link>
      </div>

      <div className="property__layout">
        <div className="property__main" itemScope itemType="https://schema.org/Product">
          <meta itemProp="name" content={property.title} />
          <meta itemProp="image" content={property.pictures[0]} />
          <PropertyGallery title={property.title} pictures={property.pictures} />

          <article className="property-info" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="EUR" />
            <meta itemProp="price" content={property.price_per_night} />
            <h1 className="property-info__title" itemProp="name">{property.title}</h1>
            <p className="property-info__location" itemScope itemType="https://schema.org/Organization">
              <span className="icon icon--location" aria-hidden="true" itemProp="location"></span>{property.location}
            </p>
            <p className="property-info__description" itemProp="description">{property.description}</p>

            <section className="property-info__section" aria-labelledby="equipments-title" itemScope itemType="https://schema.org/ItemList">
              <h2 className="property-info__heading" id="equipments-title" itemProp="name">Équipements</h2>
              <ul className="property-info__tags" role="list">
                {property.equipments.map((equipment) => (
                  <li className="tag property-info__tag" key={equipment} itemProp="itemListElement">{equipment}</li>
                ))}
              </ul>
            </section>

            <section className="property-info__section" aria-labelledby="tags-title" itemScope itemType="https://schema.org/ItemList">
              <h2 className="property-info__heading" id="tags-title" itemProp="name">Catégories</h2>
              <ul className="property-info__tags" role="list">
                {property.tags.map((tag) => (
                  <li className="tag property-info__tag" key={tag} itemProp="itemListElement">{tag}</li>
                ))}
              </ul>
            </section>
          </article>
        </div>

        <aside className="host-card" aria-labelledby="host-title">
          <h2 className="host-card__title" id="host-title">Votre hôte</h2>
          <div className="host-card__profile" itemScope itemType="https://schema.org/Organization">
            <Image className="host-card__avatar" src={property.host.picture} alt="" width={81} height={81} />
            <p className="host-card__name" itemProp="name">{property.host.name}</p>
            <p className="rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <span className="icon icon--star rating__star" aria-hidden="true"></span>
              <meta itemProp="ratingCount" content="100" />
              <span className="visually-hidden">Note :</span> <span itemProp="ratingValue">{property.rating_avg}</span><span className="visually-hidden"> sur 5</span>
            </p>
          </div>
          <div className="host-card__actions">
            <Link className="button button--block" href="/messagerie">Envoyer un message</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
