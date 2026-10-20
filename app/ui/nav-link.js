"use client";

// Lien de navigation qui connaît la page en cours (aria-current + classe active)
// et referme le menu mobile (popover) après un clic.

import Link from "next/link";
import { usePathname } from "next/navigation";

// matchSubpaths : actif aussi sur les sous-pages (/messagerie, /messagerie/conversation)
export default function NavLink({ href, className = "", activeClassName = "", matchSubpaths = false, children, ...props }) {

  // chemin de l'URL courante
  const pathname = usePathname();
  // chemin exact ?
  const isExact = pathname === href;
  // ou sous-chemin ?
  const isSubpath = matchSubpaths && pathname.startsWith(`${href}/`);
  // Seuls les liens de menu (avec activeClassName) signalent la page en cours
  const isActive = Boolean(activeClassName) && (isExact || isSubpath);

  // Mobile : on ferme le popover du menu burger
  function handleClick(event) {
    event.currentTarget.closest("[popover]")?.hidePopover();
  }

  // Rendu du lien avec les props adaptées
  return (
    <Link
      href={href}
      className={isActive ? `${className} ${activeClassName}` : className}
      // "page" sur la page exacte, "true" sur une sous-page (rubrique en cours)
      aria-current={isActive ? (isExact ? "page" : "true") : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
