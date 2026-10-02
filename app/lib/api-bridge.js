// Couche réseau, sans React : utilisable depuis un hook comme depuis un
// gestionnaire d'évènement (Login), un loader de route, un test, etc.

const BASE_URL = "http://localhost:8000";

/**
 * Erreur API : message exploitable pour l'UI + status HTTP (403, 404...)
 * pour permettre aux pages d'afficher forbidden() / notFound()
 */
// export class ApiError extends Error {
//   constructor(message, status) {
//     super(message);
//     this.status = status;
//   }
// }

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
      return ({ error: true, message: "Page non trouvée." });
    }
    // throw new Error(data?.message || `Erreur ${response.status}`, response.status);
    return ({ error: true, message: `Erreur ${response.status}` });
  }

  // on retourne la donnée JSON reçue, sous forme d'objet
  return {error: false, data: response.json()};
}

// Gère les erreurs API
async function apiHandleRequest(url) {
  const response = await request(url);
  console.log(response);
  if (response.error) {
    throw new Error(response.message);
  }
  return response.data;
}
// Fonctions dédiées par endpoint : le reste de l'app ne manipule plus d'URL.

// export function apiUserUpdate(userData, token) {
//   return request("/auth/profile", { method: "PUT", body: userData, token });
// }

/**
 * Properties
 */

export function apiListProperties() {
  return apiHandleRequest("/api/properties");
}