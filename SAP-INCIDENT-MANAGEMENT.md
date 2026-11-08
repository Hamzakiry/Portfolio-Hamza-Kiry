# SAP Incident Management — ajout local du 8 novembre 2026

## Périmètre et sources

Projet pratique guidé SAP CLD200, novembre 2026, environnement SAP BTP Trial. Ce projet n’est ni une mission client ni une certification SAP. Kyma n’a pas été réalisé.

Dépôt examiné : https://github.com/Hamzakiry/incident-management
Commit lu : 34a1efa3d0db1fe775e31ef052e3f446dc030a5a.

- package.json : CAP/Node.js, HANA, XSUAA, Work Zone, HTML5 Repository, tests CAP.
- db/shema.cds : incidents, clients, statuts, urgences, conversations.
- srv/services.cds : services ProcessorService et AdminService, brouillons, rôles support/admin.
- srv/services.js : urgence élevée si le titre contient urgent, modification d’incident fermé refusée.
- app/incident/webapp/manifest.json : OData V4, Fiori Elements, navigation Work Zone.
- mta.yaml et xs-security.json : modules MTA, HANA, Cloud Foundry, HTML5, destinations, XSUAA.
- test/test.cjs : tests du cycle des brouillons, de la logique d’urgence et des autorisations. Ces tests SAP ont été lus, pas exécutés ici.
- Les exécutions SAP CI/CD, le webhook GitHub et la mission à 100 % sont confirmés par l’utilisateur ; les captures attestent les états visibles. La configuration du pipeline externe n’est pas stockée dans le dépôt examiné.

## Captures fournies

Ressources : src/images/sap-incident-management/.

- incidents-list.webp : WhatsApp 13.35.06, écran principal ; en-tête de compte et espaces inutiles retirés.
- work-zone.webp : WhatsApp 13.35.08, tuile du portail ; avatar et espaces inutiles retirés.
- discovery-center-completed.webp : WhatsApp 13.35.20, titre et progression 100 %/Completed ; nom et date de démarrage masqués, diagramme pédagogique hors périmètre retiré.
- cicd-success.webp : WhatsApp 13.35.34 ; Build, Additional Unit Tests, Release en succès. Malware Scan, Acceptance, Compliance sont Skipped et ne sont pas revendiquées comme validées. La capture originale est partielle ; aucune zone manquante n’a été reconstruite.

Quatre images WebP, environ 89 Ko au total. Aucun faux justificatif généré. La capture détaillée d’un incident/conversation n’a pas été fournie et n’a pas été inventée.

## Modifications

- Carte SAP dans Projets et dans la galerie d’accueil ; les dix projets précédents sont conservés.
- Route locale #/projects/sap-incident-management : objectif, fonctionnalités, architecture, livraisons/apprentissages et galerie de preuves, FR/EN.
- Images avec textes alternatifs et liens pleine résolution ; mise en page adaptative ajoutée.
- Correction du pré-rendu pour conserver les nouvelles routes hash dans les liens.
- CV FR/EN : nouvelle entrée concise dans Projets, sur une page ; tous les projets précédents conservés, photo et QR préservés. PDF sous public/cv et output/pdf.

## Vérifications

- Compilation production : réussie.
- Tests du portfolio : 14 réussis.
- Contrôles statiques : lien GitHub exact, route du détail dans le pré-rendu, libellés FR, quatre fichiers image valides.
- CV : rendu des deux PDF inspecté ; une page chacun, textes de tous les anciens projets conservés et extractibles, entrée SAP présente, QR codes décodés depuis le rendu final.
- Contrôle navigateur local terminé après autorisation : Chrome de test, formats 1440 × 1000, 768 × 1024, 390 × 844 et 320 × 760. Aucun débordement horizontal ni erreur JavaScript ; 11 cartes dans Projets et 11 entrées dans la galerie d’accueil. Navigation vers la fiche, FR/EN et menu mobile vérifiés ; quatre images chargées et liens pleine résolution valides.
- Rendus ordinateur et mobile inspectés : palette et mise en page cohérentes, textes et CTA lisibles. Les captures larges sont réduites sur téléphone et disposent d’un lien pleine résolution. Preuves locales : tmp/ui-proof/, rapport checks.json.

Publication autorisée par l’utilisateur le 8 novembre 2026, après validation des changements locaux. La version à publier inclut la fiche SAP, les quatre captures et les deux CV actualisés.
