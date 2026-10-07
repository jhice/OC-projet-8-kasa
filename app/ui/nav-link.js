"use client";

// Lien de navigation qui connaît la page en cours (aria-current + classe active)
// et referme le menu mobile (popover) après un clic.

import Link from "next/link";
import { usePathname } from "next/navigation";

// matchSubpaths : actif aussi sur les sous-pages (/messagerie → /messagerie/conversation)
export default function NavLink({ href, className = "", activeClassName = "", matchSubpaths = false, children, ...props }) {
  const pathname = usePathname();
  const isExact = pathname === href;
  const isSubpath = matchSubpaths && pathname.startsWith(`${href}/`);
  // Seuls les liens de menu (avec activeClassName) signalent la page en cours
  const isActive = Boolean(activeClassName) && (isExact || isSubpath);

  // La navigation Next ne recharge pas la page : le popover resterait ouvert
  function handleClick(event) {
    event.currentTarget.closest("[popover]")?.hidePopover();
  }

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
