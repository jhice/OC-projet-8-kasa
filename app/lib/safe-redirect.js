// N'accepte qu'un chemin interne ("/favoris"), jamais une URL externe :
// "//site.com" et "/\site.com" (lu "//site.com" par les navigateurs) sont refusés
export function safeRedirectPath(path) {
  return typeof path === "string" && /^\/(?![/\\])/.test(path) ? path : "/";
}
