import "../ui/css/favorites.css";

import PropertyCard from "../ui/property-card";
import { apiListProperties } from "../lib/api-bridge";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Vos favoris",
};

export default async function FavoritesPage() {
  // proxy.js redirige déjà, mais on revérifie au plus près des données
  const session = await getSession();
  if (!session) redirect("/connexion?redirect=/favoris");

  // TODO : remplacer par l'appel API des favoris de l'utilisateur connecté
  const properties = await apiListProperties();
  const favorites = properties.slice(0, 3);

  return (
    <main id="contenu" tabIndex="-1" className="page__main container favorites">
      <section className="hero">
        <h1 className="hero__title">Vos favoris</h1>
        <p className="hero__text">
          <span className="favorites__text-line">Retrouvez ici tous les logements que vous avez aimés.</span>
          <span className="favorites__text-line">Prêts à réserver ? Un simple clic et votre prochain séjour est en route.</span>
        </p>
      </section>

      <section className="listings" aria-label="Logements favoris">
        <ul className="listings__grid" role="list">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} titleLevel={2} isFavorite />
          ))}
        </ul>
      </section>
    </main>
  );
}
