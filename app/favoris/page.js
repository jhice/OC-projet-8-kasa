import "../ui/css/favorites.css";

import Link from "next/link";

import PropertyCard from "../ui/property-card";
import { requireSession } from "../lib/session";
import { getFavorites } from "../lib/favorites";

export const metadata = {
  title: "Vos favoris",
};

export default async function FavoritesPage() {
  await requireSession("/favoris");

  const favorites = await getFavorites();

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
        {favorites.length > 0 ? (
          <ul className="listings__grid" role="list">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} titleLevel={2} isFavorite />
            ))}
          </ul>
        ) : (
          <div className="favorites__empty">
            <p>Vous n’avez pas encore de favoris.</p>
            <p>Cliquez sur le cœur d’un logement pour le retrouver ici.</p>
            <Link className="button favorites__empty-button" href="/">Découvrir nos logements</Link>
          </div>
        )}
      </section>
    </main>
  );
}
