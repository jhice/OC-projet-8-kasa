import "./ui/css/home.css";

import PropertyCard from "./ui/property-card";
import { apiListProperties } from "./lib/api-bridge";

import Image from "next/image";
import ImageHero from "./ui/assets/images/hero.jpg";

export default async function Home() {
  const properties = await apiListProperties();
  console.log(properties);
  const propertiesForHomepage = properties.splice(0, 9);
  return (

    <>
      <main id="contenu" tabIndex="-1" className="page__main container">
        <section className="hero">
          <h1 className="hero__title">Chez vous, <span className="hero__title-line">partout et ailleurs</span></h1>
          <p className="hero__text">Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
          <div className="hero__media">
            <Image className="hero__image" src={ImageHero} alt="" width="1116" height="458" />
          </div>
        </section>

        <section className="listings" aria-labelledby="listings-title">
          <h2 className="visually-hidden" id="listings-title">Nos logements</h2>
          <ul className="listings__grid" role="list">
            {propertiesForHomepage.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </ul>
        </section>

        <section className="how-it-works" aria-labelledby="how-it-works-title">
          <h2 className="how-it-works__title" id="how-it-works-title">Comment ça marche ?</h2>
          <p className="how-it-works__text">Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.</p>
          <ol className="how-it-works__steps" role="list">
            <li className="step">
              <h3 className="step__title">Recherchez</h3>
              <p className="step__text">Entrez votre destination, vos dates et laissez Kasa faire le reste</p>
            </li>
            <li className="step">
              <h3 className="step__title">Réservez</h3>
              <p className="step__text">Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.</p>
            </li>
            <li className="step">
              <h3 className="step__title">Vivez l’expérience</h3>
              <p className="step__text">Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.</p>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
