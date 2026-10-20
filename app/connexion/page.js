import "../ui/css/login.css";

import LoginForm from "../ui/login-form";

export const metadata = {
  title: "Connexion",
  description: "Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.",
};

/**
 * Page "connexion" (composant serveur)
 * @param {Object} searchParams.redirect Page demandée avant la connexion
 * @returns Promise<JSX.Element>
*/
export default async function LoginPage({ searchParams }) {
  // ?redirect=/favoris : page demandée avant la connexion (posé par proxy.js)
  const { redirect } = await searchParams;
  // si aucun redirect présent, direction home page (redirectTo transmis au LoginForm plus bas)
  const redirectTo = typeof redirect === "string" ? redirect : "/";

  return (
    <main id="contenu" tabIndex="-1" className="page__main page__main--centered container">
      <section className="login" aria-labelledby="login-title">
        <div className="login__inner">
          <h1 className="login__title" id="login-title">Heureux de vous revoir</h1>
          <p className="login__text">Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>

          <LoginForm redirectTo={redirectTo} />

          <div className="login__links">
            {/* Mot de passe oublié et inscription : pages pas encore disponibles */}
            <a className="link">Mot de passe oublié</a>
            <p className="login__signup">Pas encore de compte ? <a className="link link--strong">Inscrivez-vous</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
