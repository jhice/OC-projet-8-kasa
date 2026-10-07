import "../ui/css/login.css";

export const metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <main id="contenu" tabIndex="-1" className="page__main page__main--centered container">
      <section className="login" aria-labelledby="login-title">
        <div className="login__inner">
          <h1 className="login__title" id="login-title">Heureux de vous revoir</h1>
          <p className="login__text">Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>

          {/* TODO : brancher l'appel API de connexion */}
          <form className="login__form" method="post">
            <div className="field">
              <label className="field__label" htmlFor="login-email">Adresse email</label>
              <input className="field__input" id="login-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="login-password">Mot de passe</label>
              <input className="field__input" id="login-password" name="password" type="password" autoComplete="current-password" required />
            </div>
            <button className="button login__submit" type="submit">Se connecter</button>
          </form>

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
