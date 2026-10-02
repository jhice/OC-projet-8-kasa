// import styles from "./page.module.css";

import { notFound } from "next/navigation";
import PropertyCard from "./ui/property-card";
import { apiListProperties } from "./lib/api-bridge";

export default async function Home() {
  const properties = await apiListProperties();
  console.log(properties);
  const propertiesForHomepage = properties.splice(0, 9);
  return (
    <div>
      <main>
        <h1>Propriétés de la page d&rsquo;accueil</h1>
        <ul>
          {propertiesForHomepage.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ul>
      </main>
    </div>
  );
}
