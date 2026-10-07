import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Session stockée dans un cookie httpOnly, signé (non lisible ni modifiable côté navigateur).
// Elle contient l'utilisateur et le token de l'API, à renvoyer en Bearer.

const SESSION_COOKIE = "session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours, comme le token de l'API
const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

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

export async function getSession() {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(cookie);
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
