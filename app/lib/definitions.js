import * as z from "zod";

/**
 * Schéma de validation du formulaire de connexion
 */
export const SigninFormSchema = z.object({
  email: z
    .string({ error: "L'email est requis." })
    .trim()
    .min(1, { error: "L'email est requis." })
    .pipe(z.email({ error: "Veuillez saisir un email valide." })),
  password: z
    .string({ error: "Le mot de passe est requis." })
    .min(1, { error: "Le mot de passe est requis." }),
});
