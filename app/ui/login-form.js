"use client";

import { useActionState, useEffect, useRef } from "react";
import { signin } from "../actions/auth";

/**
 * Connexion utilisateur (composant client)
 * @param {string} redirectTo Adresse de redirection en cas de login réussi 
 * @returns JSX.Element
 */
export default function LoginForm({ redirectTo }) {

  // server action pour la connexion
  const [state, action, pending] = useActionState(signin, null);

  // références aux champs de formulaire
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // erreurs éventuelles
  const emailError = state?.errors?.email?.[0];
  const passwordError = state?.errors?.password?.[0];
  const formError = state?.errors?.form?.[0];

  useEffect(() => {
    // Après une erreur de saisie, le focus va sur le premier champ en erreur
    if (emailError) emailRef.current?.focus();
    else if (passwordError) passwordRef.current?.focus();
  }, [state, emailError, passwordError]);

  return (
    // noValidate : validation côté serveur
    <form className="login__form" action={action} noValidate>
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {/* erreurs génériques du form */}
      {formError && <p className="form-error" role="alert">{formError}</p>}

      {/* ligne de champ de formulaire avec référence, gestion message d'erreur, valeur par défaut */}
      <div className="field">
        <label className="field__label" htmlFor="login-email">Adresse email</label>
        <input
          ref={emailRef}
          className={emailError ? "field__input field__input--invalid" : "field__input"}
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state?.email}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "login-email-error" : undefined}
        />
        {emailError && <p className="field__error" id="login-email-error">{emailError}</p>}
      </div>

      {/* ligne de champ de formulaire avec référence, gestion message d'erreur, valeur par défaut */}
      <div className="field">
        <label className="field__label" htmlFor="login-password">Mot de passe</label>
        <input
          ref={passwordRef}
          className={passwordError ? "field__input field__input--invalid" : "field__input"}
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={passwordError ? true : undefined}
          aria-describedby={passwordError ? "login-password-error" : undefined}
        />
        {passwordError && <p className="field__error" id="login-password-error">{passwordError}</p>}
      </div>

      {/* état du bouton qui dépend de l'état de l'action de serveur */}
      <button className="button login__submit" type="submit" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
