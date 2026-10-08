import { http, HttpResponse } from 'msw'

export const handlers = [
  // Simuler ajout favoris
  http.post( // 1 - Définition de la méthode HTTP
    '/api/properties/:id/favorite', // 2 - Définition de la route
    ({ params }) => { // 3 - Définition de la fonction de traitement
      const { id } = params // 4 - Récupération des paramètres de la route

      // Simuler une réponse réussie
      return HttpResponse.json({
        id: parseInt(id),
      })
    }),
  // Simuler suppression favoris
  http.delete( // 1 - Définition de la méthode HTTP
    '/api/properties/:id/favorite', // 2 - Définition de la route
    ({ params }) => { // 3 - Définition de la fonction de traitement
      const { id } = params // 4 - Récupération des paramètres de la route

      // Simuler une réponse réussie
      return HttpResponse.json({
        id: parseInt(id),
      })
    }),
]