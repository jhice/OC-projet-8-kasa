import * as z from "zod";

// Connexion : on vérifie seulement la présence des champs et le format de l'email,
// les règles de mot de passe concernent l'inscription.
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
