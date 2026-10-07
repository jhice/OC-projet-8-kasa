"use client";

// Déconnexion via server action (POST) : ni préchargeable ni déclenchable par un simple lien.
// Le clic referme aussi le menu mobile, qui resterait ouvert après la redirection.

import { logout } from "../actions/auth";

export default function LogoutButton({ className }) {
  function handleClick(event) {
    event.currentTarget.closest("[popover]")?.hidePopover();
  }

  return (
    <form action={logout}>
      <button className={className} type="submit" onClick={handleClick}>Déconnexion</button>
    </form>
  );
}
