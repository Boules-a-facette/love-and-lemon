# Vérification de la reprise — love-and-lemon.fr

29 septembre 2026. Contrôle fait par l'orchestrateur après la construction déléguée (deux passages
Claude Code) et une passe de correction, sur le site servi en local (`python3 -m http.server 8899`),
comparé page par page à l'original en ligne.

## Ce qui a été mesuré

| Contrôle | Résultat |
|---|---|
| Les 13 URL d'origine répondent 200, plus `404.html` | conforme |
| Styles calculés `h1` à `h6` et `body`, page par page | identiques à l'original (police, taille, graisse, casse, couleur) |
| Couleur des liens du menu et de l'entrée courante | identiques (noir `#000`, courant `#e0e0e0`) |
| Logo d'en-tête | `thin-logo-dark-1`, opaque, comme l'original |
| Débordement horizontal à 375, 768 et 1440 px | aucun (accueil et grille) |
| Références locales mortes | aucune (685 références vérifiées) |
| `http://` résiduels, `demo.select-themes`, boutique, ancien hébergement | aucun |
| Le domaine d'origine n'apparaît que dans les `canonical` | conforme |
| Grille « Jolies Photos » : 191 éléments, filtre, « Charger plus », visionneuse | fonctionnels (60 → 120 après clic, 12 en « Cérémonie ») |
| Formulaires Contact et Devis | présents, champs de l'original, `mailto:` vers les bons destinataires |

**Correction apportée après le premier passage.** Cinq écarts, tous mesurés, ont été corrigés : la
couleur du menu et le logo d'en-tête étaient inversés (liens blancs sur fond clair, logo clair
invisible) ; la page Devis affichait son shortcode brut en texte, sans formulaire ; l'accueil avait
perdu le carrousel plein écran de l'original (il n'en gardait que le second slider) ; la grille ne
comptait que 60 des 191 réalisations ; les replis de police et les graisses des titres différaient.

## Non vérifié, à regarder sur un vrai navigateur

- **Comparaison visuelle image par image.** Le harnais d'automatisation a cessé de rendre les
  captures d'écran en cours de contrôle (délai d'expiration côté outil). Le rendu a donc été
  contrôlé par la mesure (styles calculés, positions, tailles) et non à l'œil, sauf quelques
  captures prises avant le blocage.
- **L'ouverture réelle d'un logiciel de messagerie par les formulaires.** L'envoi se fait par
  `mailto:` : le site n'envoie rien lui-même, il ouvre le client de messagerie du visiteur. Aucun
  envoi réel n'a donc été testé de bout en bout — c'est une limite assumée du choix `mailto:`.
- **La carte Google** (page Contact), remplacée par un `iframe` d'intégration sans clé.
- Les pages autres que l'accueil et la grille en 375 et 768 px : seuls les styles calculés et
  l'absence de débordement ont été contrôlés, pas les rendus image par image.

## Publication

- Dépôt : https://github.com/Boules-a-facette/love-and-lemon (public, branche `main`).
- Site sur son URL technique : https://boules-a-facette.github.io/love-and-lemon/ — HTTPS forcé.
- Les `canonical`, `sitemap.xml` et `robots.txt` désignent **www.love-and-lemon.fr**, l'hôte cible.
  C'est volontaire : la bascule DNS reste à faire, et ces déclarations deviendront exactes à ce
  moment-là.
