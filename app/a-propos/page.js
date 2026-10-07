import "../ui/css/about.css";

import Image from "next/image";
import ImageHero from "../ui/assets/images/a-propos-hero.webp";
import ImageMission from "../ui/assets/images/a-propos-mission.webp";

export const metadata = {
  title: "À propos",
};

export default function AboutPage() {
  return (
    <main id="contenu" tabIndex="-1" className="page__main container">
      <section className="hero">
        <h1 className="hero__title">À propos</h1>
        <p className="hero__text">Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
        <p className="hero__text">Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.</p>
        <div className="hero__media">
          <Image className="hero__image" src={ImageHero} alt="" sizes="100vw" preload />
        </div>
      </section>

      <section className="mission" aria-labelledby="mission-title">
        <h2 className="mission__title" id="mission-title">Notre mission est simple :</h2>
        <ol className="mission__list">
          <li>Offrir une plateforme fiable et simple d’utilisation</li>
          <li>Proposer des hébergements variés et de qualité</li>
          <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
        </ol>
        <Image className="mission__image" src={ImageMission} alt="" sizes="(min-width: 1024px) 494px, 100vw" loading="lazy" />
        <p className="mission__conclusion">Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.</p>
      </section>
    </main>
  );
}
