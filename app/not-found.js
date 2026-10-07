// Page 404 : URL inconnue, ou notFound() appelé par une page (logement inexistant)

import "./ui/css/error.css";

import Link from "next/link";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main id="contenu" tabIndex="-1" className="page__main page__main--centered container">
      <section className="error">
        <h1 className="error__code"><span className="visually-hidden">Erreur </span>404</h1>
        <p className="error__text">Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.</p>
        <div className="error__actions">
          <Link className="button" href="/">Accueil</Link>
          <Link className="button" href="/#listings-title">Logements</Link>
        </div>
      </section>
    </main>
  );
}
