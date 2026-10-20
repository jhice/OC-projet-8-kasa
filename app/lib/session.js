import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Session stockée dans un cookie httpOnly, signé (non lisible ni modifiable côté navigateur).
// Elle contient l'utilisateur et le token de l'API, à renvoyer en Bearer.

const SESSION_COOKIE = "session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours, comme le token de l'API
// secret pour l'encodage de la clé
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

/**
 * Chiffrement signé d'une donnée reçue
 * @param {string} payload 
 */
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Déchiffrement et validation d'un token donné
 * @param {string} session 
 * @returns JWTPayload|null Le token validé ou null
 */
export async function decrypt(session) {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
    return payload;
  } catch {
    // signature invalide ou session expirée
    return null;
  }
}

/**
 * Création d'une session à partir des infos données
 * @param {string} userId 
 * @param {string} userName 
 * @param {string} userEmail 
 * @param {string} apiToken token reçu de l'API backend
 */
export async function createSession(user, apiToken) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await encrypt({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    apiToken,
  });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Récupère la session utilisateur
 */
export async function getSession() {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(cookie);
}

/**
 * Vérification d'une session présente pour un chemin donné
 * @param {string} currentPath Le chemin demandé
 * @returns La session, ou une redirection si non trouvée
 */
export async function requireSession(currentPath) {
  const session = await getSession();
  if (!session) {
    redirect(`/connexion?redirect=${encodeURIComponent(currentPath)}`);
  };
  return session;
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
