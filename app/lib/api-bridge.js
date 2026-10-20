// Couche réseau, sans React : utilisable depuis un hook comme depuis un
// gestionnaire d'évènement (Login), un loader de route, un test, etc.

let BASE_URL;
if (process.env.ENV === "dev") {
  BASE_URL = "http://localhost:8000";
} else {
  BASE_URL = "https://oc-kasa-backend.onrender.com";
}

/**
 * Erreur API : message exploitable pour l'UI + status HTTP (403, 404...)
 * pour permettre aux pages d'afficher forbidden() / notFound()
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Appel HTTP générique.
 * @param {string} pathOrUrl  "/api/login" ou une URL absolue déjà construite
 * @param {object} [options]
 * @param {string} [options.method]  "GET" par défaut
 * @param {object} [options.body]    sérialisé en JSON si présent
 * @param {string} [options.token]   ajoute l'en-tête Authorization: Bearer
 * @returns {Promise<any>}  le JSON de la réponse
 * @throws {Error}  message exploitable pour l'UI si la requête échoue
 */
export async function request(pathOrUrl, { method = "GET", body, token } = {}) {
  // url relative ou absolue
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${BASE_URL}${pathOrUrl}`;

  const headers = {};
  if (body !== undefined) {
    // entêtes de requête selon si body JSON présent ou non
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    // ajout Bearer si token présent
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    // appel de la requête
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // serveur injoignable, coupure réseau, CORS...
    return ({ error: true, message: "Erreur de connexion au serveur (fetch())." });
  }

  // si réponse !== 2xx
  if (!response.ok) {
    // 404 sur une route inconnue
    if (response.status === 404) {
      // throw new Error("Erreur 404.", response.status);
      return ({ error: true, status: 404, message: "Page non trouvée." });
    }
    // throw new Error(data?.message || `Erreur ${response.status}`, response.status);
    return ({ error: true, status: response.status, message: `Erreur ${response.status}` });
  }

  // on retourne la donnée JSON reçue, sous forme d'objet
  return { error: false, data: await response.json() };
}

/**
 * Gestionnaire d'appel API générique
 * Gère les erreurs API
 * @param {string} url Le endpoint API à appeler
 * @param {Object} options Les options à transmettre avec la requête
 * @returns 
 */
async function apiHandleRequest(url, options) {
  const response = await request(url, options);
  if (response.error) {
    throw new ApiError(response.message, response.status);
  }
  return response.data;
}

// Fonctions dédiées par endpoint : le reste de l'applie ne manipule plus d'URL.

// export function apiUserUpdate(userData, token) {
//   return request("/auth/profile", { method: "PUT", body: userData, token });
// }

/**
 * Auth
 */

// Retourne { token, user }, 401 si identifiants incorrects
export function apiLogin(email, password) {
  return apiHandleRequest("/auth/login", { method: "POST", body: { email, password } });
}

/**
 * Favoris (token requis)
 */

// Logements favoris de l'utilisateur (403 si ce n'est pas le sien)
export function apiListFavorites(userId, token) {
  return apiHandleRequest(`/api/users/${encodeURIComponent(userId)}/favorites`, { token });
}

// Ajout favori
export function apiAddFavorite(propertyId, token) {
  return apiHandleRequest(`/api/properties/${encodeURIComponent(propertyId)}/favorite`, { method: "POST", token });
}

// Retrait favori
export function apiRemoveFavorite(propertyId, token) {
  return apiHandleRequest(`/api/properties/${encodeURIComponent(propertyId)}/favorite`, { method: "DELETE", token });
}

/**
 * Properties
 */

// Toutes les propriétés
export function apiListProperties() {
  return apiHandleRequest("/api/properties");
}

// Une propriété par son identifiant
export function apiGetProperty(id) {
  return apiHandleRequest(`/api/properties/${encodeURIComponent(id)}`);
}