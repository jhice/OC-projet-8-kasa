import "../../ui/css/messaging.css";

import Image from "next/image";
import Link from "next/link";

import { requireSession } from "../../lib/session";

export const metadata = {
  title: "Conversation avec Nathalie Jean",
};

// Page statique (maquette) : les données réelles viendront avec l'API de messagerie.
// Mobile : conversation seule. Dès 768px : liste + conversation.
export default async function ConversationPage() {
  await requireSession("/messagerie/conversation");

  return (
    <main id="contenu" tabIndex="-1" className="page__main container messaging messaging--thread">
      <div className="messaging__panel">
        <section className="inbox" aria-labelledby="inbox-title">
          <Link className="button button--secondary button--with-icon inbox__back" href="/">
            <span className="icon icon--back" aria-hidden="true"></span>Retour<span className="visually-hidden"> à l’accueil</span>
          </Link>
          <h2 className="inbox__title" id="inbox-title">Messages</h2>
          <ul className="inbox__list" role="list">
            <li>
              <Link className="conversation conversation--active" href="/messagerie/conversation" aria-current="page">
                <Image className="conversation__avatar" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg" alt="" width={44} height={44} />
                <span className="conversation__name">Nathalie Jean</span>
                <time className="conversation__time" dateTime="2025-09-03T11:10">11:10</time>
                <span className="conversation__preview">Pas de souci, je vous attendrai sur place pour la remise des clés.</span>
              </Link>
            </li>
            <li>
              <Link className="conversation conversation--unread" href="/messagerie/conversation">
                <Image className="conversation__avatar" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-1.jpg" alt="" width={44} height={44} />
                <span className="conversation__name">Della Case</span>
                <time className="conversation__time" dateTime="2025-09-03T09:47">09:47</time>
                <span className="conversation__preview">Merci pour votre séjour ! N’hésitez pas à laisser un avis sur le logement.</span>
                <span className="conversation__unread"><span className="visually-hidden">Non lu</span></span>
              </Link>
            </li>
            <li>
              <Link className="conversation" href="/messagerie/conversation">
                <Image className="conversation__avatar" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg" alt="" width={44} height={44} />
                <span className="conversation__name">Franck Maher</span>
                <time className="conversation__time" dateTime="2025-09-02T18:21">Hier</time>
                <span className="conversation__preview">Le studio dispose bien d’une connexion WiFi, le code est dans le livret d’accueil.</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="thread" aria-labelledby="thread-title">
          <div className="thread__back">
            <Link className="button button--secondary button--with-icon" href="/messagerie">
              <span className="icon icon--back" aria-hidden="true"></span>Retour<span className="visually-hidden"> aux conversations</span>
            </Link>
          </div>
          <h1 className="visually-hidden" id="thread-title">Conversation avec Nathalie Jean</h1>
          <ol className="thread__messages" role="list" tabIndex="0" aria-label="Messages échangés avec Nathalie Jean">
            <li className="thread__date"><time dateTime="2025-09-03">3 septembre 2025</time></li>
            <li className="message message--sent">
              <span className="message__avatar" aria-hidden="true"></span>
              <div className="message__content">
                <p className="message__meta">Vous <span aria-hidden="true">•</span> <time dateTime="2025-09-03T11:02">11:02</time></p>
                <p className="message__bubble">Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?</p>
              </div>
            </li>
            <li className="message message--received">
              <Image className="message__avatar" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg" alt="" width={28} height={28} />
              <div className="message__content">
                <p className="message__meta">Nathalie Jean <span aria-hidden="true">•</span> <time dateTime="2025-09-03T11:04">11:04</time></p>
                <p className="message__bubble">Bonjour ! Oui, l’appartement est libre ces dates-là. Vous serez combien ?</p>
              </div>
            </li>
            <li className="message message--sent">
              <span className="message__avatar" aria-hidden="true"></span>
              <div className="message__content">
                <p className="message__meta">Vous <span aria-hidden="true">•</span> <time dateTime="2025-09-03T11:06">11:06</time></p>
                <p className="message__bubble">Nous serons deux. Est-il possible d’arriver vers 18 h le vendredi ?</p>
              </div>
            </li>
            <li className="message message--received">
              <Image className="message__avatar" src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg" alt="" width={28} height={28} />
              <div className="message__content">
                <p className="message__meta">Nathalie Jean <span aria-hidden="true">•</span> <time dateTime="2025-09-03T11:10">11:10</time></p>
                <p className="message__bubble">Pas de souci, je vous attendrai sur place pour la remise des clés.</p>
              </div>
            </li>
          </ol>
          <form className="composer" method="post">
            <div className="composer__field">
              <label className="visually-hidden" htmlFor="composer-input">Votre message à Nathalie Jean</label>
              <textarea className="composer__input" id="composer-input" name="message" rows={1} placeholder="Envoyer un message" />
              <button className="button button--icon composer__send" type="submit" aria-label="Envoyer le message">
                <span className="icon icon--send" aria-hidden="true"></span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
