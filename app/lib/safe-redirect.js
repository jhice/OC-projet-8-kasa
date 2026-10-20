// N'accepte qu'un chemin interne ("/favoris"), jamais une URL externe
// par ex. /connexion?redirect=https://google.fr
export function safeRedirectPath(path) {
  // si préfixe http, on redirige vers la home page
  return typeof path === "string" && !/^http/.test(path) ? path : "/";
}
