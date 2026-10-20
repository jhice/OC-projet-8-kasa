"use client"; // Error boundaries must be Client Components

/**
 * Erreur générique non interceptée (composant client)
 * @returns JSX.Element
*/
export default function GlobalError({ error, retry }) {
  return (
    <html>
      <body>
        <h2>Une erreur est survenue.</h2>
        <p>{error.message}</p>
        <button onClick={() => retry()}>Réessayer</button>
      </body>
    </html>
  );
}