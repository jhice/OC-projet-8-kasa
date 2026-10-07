"use server";

import * as z from "zod";
import { redirect } from "next/navigation";

import { SigninFormSchema } from "../lib/definitions";
import { apiLogin } from "../lib/api-bridge";
import { createSession, deleteSession } from "../lib/session";

// N'accepte qu'un chemin interne ("/favoris"), jamais une URL externe :
// "//site.com" et "/\site.com" (lu "//site.com" par les navigateurs) sont refusés
function safeRedirectPath(path) {
  return typeof path === "string" && /^\/(?![/\\])/.test(path) ? path : "/";
}

export async function signin(state, formData) {
  const email = formData.get("email") ?? "";

  // 1. Validation des champs
  const validatedFields = SigninFormSchema.safeParse({
    email,
    password: formData.get("password"),
  });

  // L'email saisi est renvoyé pour réafficher le champ (jamais le mot de passe)
  if (!validatedFields.success) {
    return {
      email,
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // 2. Appel API + création de la session
  try {
    const { token, user } = await apiLogin(validatedFields.data.email, validatedFields.data.password);
    await createSession(user, token);
  } catch (error) {
    let message = "Une erreur est survenue, veuillez réessayer.";
    if (error.status === 401) message = "Email ou mot de passe incorrect.";
    if (error.status === undefined) message = "Connexion au serveur impossible, veuillez réessayer plus tard.";
    return {
      email,
      errors: { form: [message] },
    };
  }

  // 3. Redirection vers la page demandée (hors du try : redirect() lève une exception)
  redirect(safeRedirectPath(formData.get("redirectTo")));
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
