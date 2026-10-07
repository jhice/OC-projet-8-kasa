// Session refusée par l'API (401) : suppression du cookie puis retour à la connexion.
// Appelée uniquement par redirection depuis un composant serveur (qui ne peut pas modifier les cookies).

import { redirect } from "next/navigation";
import { deleteSession } from "../lib/session";

export async function GET() {
  await deleteSession();
  redirect("/connexion");
}
