# love-and-lemon.fr

Version statique du site de **Sweet Paper SARL** (enseigne Love and Lemon, wedding planner et
décoratrice florale de mariage, 73420 Méry), reprise depuis son WordPress d'origine.

13 pages, sans dépendance serveur : HTML, CSS et un peu de JavaScript, à publier tel quel sur
GitHub Pages. La racine du dépôt est la racine du site.

| Page | URL |
|---|---|
| Accueil | `/` |
| Nos Offres | `/decoration-mariage-savoie-haute-savoie-chambery-annecy-grenoble-decoratrice-mariage/` |
| Jolies Photos | `/decoratrice-organisatrce-mariage-aix-chambery-annecy-savoie/` |
| Bar à Fleurs | `/bar-a-fleurs-animation-cocktail-vin-dhonneur-mariage-savoie-haute-savoie-isere/` |
| Borne à Selfie | `/location-borne-a-selfie-photo-mariage-savoie-haute-savoie-isere-suisse-73-74/` |
| Tarifs | `/tarifs-decoratrice-mariage-fleursite-wedding-planner-savoie-haute-savoie-annecy-suisse-chambery/` |
| Contact | `/wedding-planner-savoie-chamberty-annecy-retro-vintage/` |
| La team | `/la-team/` |
| Devis | `/devis/` |
| Mentions Légales | `/mentions-legales/` |
| CGV | `/conditions-generales-de-vente/` |
| Protection des données | `/protection-des-donnees-personnelles/` |

Les URL sont celles de l'origine (slugs fautifs compris, `organisatrce`, `chamberty`), pour ne rien
casser au référencement.

- `assets/` — ce que le site sert : images (WebP), CSS, JS. Les 1149 médias sont les variantes exactes
  que servait `wp-content/uploads/` (recadrages compris), converties en WebP.
- **La page « Nous » a été retirée** (décision du 29/09/2026) : son URL d'origine
  `/decoratrice-mariage-wedding-planner-savoie-chambery-annecy/` était indexée et liée depuis le menu
  de toutes les pages. Elle n'est plus dans le menu ni dans le sitemap, et son URL sert une page de
  **redirection vers `/la-team/`** — pas un 404. Son contenu propre (l'histoire de la marque et les
  encarts « ON AIME » / « ON GÈRE » / « Transparence ») n'a pas été reporté ailleurs : les deux
  portraits (Mallory, Sandrine) figurent déjà sur « La team ».
- **Formulaires** (Contact et Devis) : l'envoi se fait par `mailto:` — le site n'envoie rien lui-même,
  il ouvre le logiciel de messagerie du visiteur. Destinataires : `hello@love-and-lemon.fr` (contact)
  et `sweetpaper.fairepart@gmail.com` (devis).

La matière première de la reprise — HTML des pages d'origine, contenu extrait de la base WordPress,
CSS/JS du thème Bodega (un thème payant) et copie complète des médias d'origine — ne vit pas ici :
elle est conservée hors dépôt, chemin noté dans l'audit du projet (`migration_mallory`).

Origine conservée hors ligne. Aucune modification n'a été faite sur le site WordPress d'origine.
