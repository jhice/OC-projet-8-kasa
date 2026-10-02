// import styles from "./page.module.css";

import PropertyCard from "./ui/property-card";

export default async function Home() {
  const data = await fetch('http://localhost:8000/api/properties')
  const properties = await data.json();
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
