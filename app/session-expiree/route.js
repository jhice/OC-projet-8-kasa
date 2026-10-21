// Session refusée par l'API (401) : suppression du cookie puis retour à la connexion.

import { redirect } from "next/navigation";
import { deleteSession } from "../lib/session";

export async function GET() {
  await deleteSession();
  redirect("/connexion");
}
