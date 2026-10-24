# Audit SEO et configuration du portfolio

Audit effectué le 24 octobre 2026 sur https://hamzakiry.github.io/Portfolio-Hamza-Kiry/.

## État initial vérifié

- Accueil HTTP 200, sans en-tête X-Robots-Tag noindex.
- Titre et meta description déjà présents ; pas de balise noindex.
- Aucun sitemap : réponse HTTP 404.
- Pas d’URL canonique, de données structurées ou de métadonnées de partage.
- Réponse HTML initiale d’environ 979 octets, contenu principal dépendant de JavaScript.
- Routage React avec fragments (#/projects). Les fragments ne sont pas des pages autonomes à soumettre au sitemap.
- /Portfolio-Hamza-Kiry/robots.txt autorisait l’exploration. /robots.txt à la racine du domaine renvoyait 404 : le premier ne gouverne pas les robots du domaine.
- Aucun justificatif de certificat présent dans le projet initial.
- Contact existant : liens e-mail et LinkedIn, sans service d’envoi.

## Améliorations

- Titre avec Hamza Kiry et le statut réel d’étudiant ingénieur en IA & Big Data ; description précise, adaptée à la langue.
- URL canonique HTTPS sans fragment, métadonnées Open Graph et Person/ProfilePage JSON-LD avec GitHub et LinkedIn exacts.
- Sitemap à /Portfolio-Hamza-Kiry/sitemap.xml contenant uniquement l’URL principale canonique.
- Accueil pré-rendu à chaque build depuis les composants existants avec ReactDOMServer ; aucun contenu de profil dupliqué à maintenir, aucun changement de framework ou de routage.
- Les navigateurs sans JavaScript reçoivent le profil, les compétences, les certifications et les liens des dix projets. Les interactions et les traductions nécessitent JavaScript.
- Sélecteur FR/EN, choix mémorisé localement, attribut lang et titre/description actualisés. Les noms officiels des certifications sont conservés pour correspondre aux documents.
- Aperçus WebP optimisés, chargement différé, dimensions explicites, PDF originaux disponibles par clic dans un nouvel onglet.
- Page Contact simple nom/message, selon la demande révisée : prépare un mailto, n’envoie rien automatiquement et n’utilise aucun service tiers.
- Design, palette, portrait, projets, liens et CV conservés. Aucun service acheté, hébergement GitHub Pages conservé.

## Search Console : procédure de vérification

Propriété Préfixe d’URL : https://hamzakiry.github.io/Portfolio-Hamza-Kiry/
La balise fournie par le compte Google du propriétaire est conservée dans public/index.html. Ne pas la retirer après validation.

1. Publier la version construite et attendre sa disponibilité.
2. Valider la propriété avec la méthode Balise HTML.
3. Dans Sitemaps, soumettre https://hamzakiry.github.io/Portfolio-Hamza-Kiry/sitemap.xml.
4. Inspecter l’URL principale sans #, effectuer le test en direct et demander l’indexation.
5. Consulter ensuite Inspection de l’URL / Indexation et Performances / Résultats de recherche ; filtrer la requête Hamza Kiry.

La vérification, la soumission et l’indexation sont des états différents. Une validation de propriété et un sitemap soumis ne prouvent pas que la page est déjà indexée. Google choisit le délai et le classement.
Une recherche site:hamzakiry.github.io/Portfolio-Hamza-Kiry et une recherche du nom peuvent aider, mais le rapport Inspection de l’URL est plus fiable pour confirmer l’indexation.

## Limites conservées volontairement

- Pas de migration du routage # ni de domaine payant. Le référencement vise d’abord l’accueil complet. Les pages Projets et Contact restent des vues React partageant l’URL canonique principale.
- Le choix de langue est une préférence d’interface sur la même URL ; il ne crée pas deux pages indexables séparément. Aucun hreflang trompeur n’est ajouté.
- Le robots.txt de projet est informatif. L’absence de robots.txt à la racine ne bloque pas l’exploration ; le sitemap est soumis directement à Search Console.
- Aucun score Lighthouse ou classement Google n’est inventé. Les ressources et l’absence de débordement mobile sont vérifiées, mais les performances réelles dépendent aussi du réseau.
- Contact nécessite une messagerie configurée chez le visiteur. Aucun envoi ni réception automatique n’est annoncé ; aucun e-mail réel n’a été envoyé par ce mécanisme.

## Certificats

Voir CERTIFICATES.md pour la correspondance des dix PDF. Deux justificatifs manquent : Exploring SAP Business AI Platform Architecture et Introduction to SAP Cloud Application Programming Model. Le statut SAP Certified — Positioning SAP Business AI Platform reste en cours.

## Sources officielles

- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://support.google.com/webmasters/answer/9008080
- https://support.google.com/webmasters/answer/9012289
