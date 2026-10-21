"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { SigninFormSchema } from "../lib/definitions";
import { apiLogin } from "../lib/api-bridge";
import { createSession, deleteSession } from "../lib/session";
import { safeRedirectPath } from "../lib/safe-redirect";

/**
 * Action du formulaire de connexion utilisateur
 * @param {object} state State du formulaire
 * @param {object} formData Les données soumises reçues du formulaire
 */
export async function signIn(state, formData) {

  // Validation des champs email et mot de passe reçus
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // En cas d'erreur d'identification
  if (!validatedFields.success) {
    // L'email saisi est renvoyé pour réafficher le champ (jamais le mot de passe)
    return {
      email: formData.get("email"),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // Tentative de connexion
  try {
    // Appel API
    const { token, user } = await apiLogin(validatedFields.data.email, validatedFields.data.password);
    // Appel création de la session
    await createSession(user, token);
  } catch (error) {
    // En cas d'erreur
    let message = "Une erreur est survenue, veuillez réessayer.";
    if (error.status === 401) {
      message = "Email ou mot de passe incorrect.";
    };
    if (error.status === undefined) {
      message = error.message;
    };

    return {
      email: formData.get("email"),
      errors: { form: [message] },
    };
  }

  // Redirection vers la page demandée (hors du try : redirect() lève une exception)
  redirect(safeRedirectPath(formData.get("redirectTo")));
}

/**
 * Déconnexion utilisateur
 */
export async function logout() {
  // supprime cookie de session
  await deleteSession();
  // redirection vers l'accueil
  redirect("/");
}
