"use client";

// Lien de navigation qui connaît la page en cours (aria-current + classe active)
// et referme le menu mobile (popover) après un clic.

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, className = "", activeClassName = "", children, ...props }) {
  const pathname = usePathname();
  // Seuls les liens de menu (avec activeClassName) signalent la page en cours
  const isActive = Boolean(activeClassName) && pathname === href;

  // La navigation Next ne recharge pas la page : le popover resterait ouvert
  function handleClick(event) {
    event.currentTarget.closest("[popover]")?.hidePopover();
  }

  return (
    <Link
      href={href}
      className={isActive ? `${className} ${activeClassName}` : className}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
