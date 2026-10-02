'use client' // Error boundaries must be Client Components

export default function GlobalError({ error, retry }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Une erreur est survenue.</h2>
        <p>{error.message}</p>
        <button onClick={() => retry()}>Réessayer</button>
      </body>
    </html>
  )
}