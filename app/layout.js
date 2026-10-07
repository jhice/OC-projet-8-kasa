import { Inter } from "next/font/google";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

import "./ui/css/variables.css";
import "./ui/css/base.css";
import "./ui/css/components.css";
import "./ui/css/layout.css";

import Image from "next/image";
import Link from "next/link";
import NavLink from "./ui/nav-link";
import LogoutButton from "./ui/logout-button";
import { getSession } from "./lib/session";
import LogoKasaIcon from "./ui/assets/logo/logo-kasa-picto.svg";
import LogoKasa from "./ui/assets/logo/logo-kasa.svg";

export const metadata = {
  title: {
    template: "Kasa — %s",
    default: "Kasa — Chez vous, partout et ailleurs",
  },
  description: "Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.",
};

export default async function RootLayout({ children }) {
  // Lecture du cookie de session : toutes les pages sont rendues à la requête
  const session = await getSession();

  return (
    <html lang="fr" className={interSans.variable}>
      <body className="page">
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <header className="header">
          <div className="header__inner">
            <nav className="header__nav" aria-label="Navigation principale">
              <ul className="header__nav-list" role="list">
                <li><NavLink className="nav-link" activeClassName="nav-link--active" href="/">Accueil</NavLink></li>
                <li><NavLink className="nav-link" activeClassName="nav-link--active" href="/a-propos">À propos</NavLink></li>
              </ul>
            </nav>

            <Link className="header__logo" href="/">
              <Image className="header__logo-picto" src={LogoKasaIcon} alt="Kasa — accueil" width="47" height="54" />
              <Image className="header__logo-full" src={LogoKasa} alt="Kasa — accueil" width="163" height="58" />
            </Link>

            <div className="header__actions">
              <div className="header__icons">
                <NavLink className="header__icon-link" activeClassName="header__icon-link--active" href="/favoris">
                  <span className="icon icon--heart" aria-hidden="true"></span>
                  <span className="visually-hidden">Favoris</span>
                </NavLink>
                <span className="header__separator" aria-hidden="true"></span>
                {/* Messagerie : page pas encore disponible */}
                <a className="header__icon-link">
                  <span className="icon icon--message" aria-hidden="true"></span>
                  <span className="visually-hidden">Messagerie</span>
                </a>
              </div>
              {session
                ? <LogoutButton className="header__auth-link" />
                : <NavLink className="header__auth-link" href="/connexion">Connexion</NavLink>}
            </div>

            <button className="header__burger" type="button" popoverTarget="mobile-menu" aria-label="Ouvrir le menu">
              <span className="icon icon--menu icon--xl" aria-hidden="true"></span>
            </button>
          </div>

          <div className="mobile-menu" id="mobile-menu" popover="auto">
            <div className="mobile-menu__head">
              <NavLink href="/">
                <Image className="header__logo-picto" src={LogoKasaIcon} alt="Kasa — accueil" width="47" height="54" />
              </NavLink>
              <button className="mobile-menu__close" type="button" popoverTarget="mobile-menu" popoverTargetAction="hide" aria-label="Fermer le menu">
                <span className="icon icon--close icon--xl" aria-hidden="true"></span>
              </button>
            </div>
            <nav className="mobile-menu__body" aria-label="Navigation mobile">
              <ul role="list">
                <li className="mobile-menu__item"><NavLink className="nav-link mobile-menu__link" activeClassName="nav-link--active" href="/">Accueil</NavLink></li>
                <li className="mobile-menu__item"><NavLink className="nav-link mobile-menu__link" activeClassName="nav-link--active" href="/a-propos">À propos</NavLink></li>
                {/* Messagerie : page pas encore disponible */}
                <li className="mobile-menu__item"><a className="nav-link mobile-menu__link">Messagerie</a></li>
                <li className="mobile-menu__item"><NavLink className="nav-link mobile-menu__link" activeClassName="nav-link--active" href="/favoris">Favoris</NavLink></li>
              </ul>
              {session
                ? <LogoutButton className="button mobile-menu__cta" />
                : <NavLink className="button mobile-menu__cta" href="/connexion">Connexion</NavLink>}
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <Image className="footer__logo" src={LogoKasaIcon} alt="" width="47" height="54" />
          <p className="footer__copyright">© 2026 Kasa. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
