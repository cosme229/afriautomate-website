# Briefs de blog — AfriAutomate

> 5 premiers articles piliers issus de l'audit SEO (mai 2026).
> Objectif : occuper la SERP francophone Afrique de l'Ouest sur les requêtes
> que les concurrents (Wa Orbit, Pixlstudio, Webgram, AAA IA, Aethos, Eqwa,
> DigitalUnicorn) occupent déjà.

---

## Pourquoi un blog (et pourquoi ces 5 articles d'abord)

Aujourd'hui, `afriautomate.com` n'a **qu'une URL indexable**. Tous les concurrents
identifiés ont entre 30 et 100+ pages. **Tant qu'on ne publie pas, Google n'a
qu'une seule porte d'entrée vers AfriAutomate**. Un blog résout 3 problèmes
en même temps :

1. **Surface SEO** — chaque article = une nouvelle URL qui peut ranker sur
   ses propres mots-clés
2. **Fraîcheur** — Google récompense les sites mis à jour régulièrement
3. **Profondeur d'autorité** — articles bien structurés + JSON-LD `Article`
   → meilleur E-E-A-T → ranking durable

Les 5 articles ci-dessous couvrent **un par étape du tunnel** :

| # | Article | Tunnel | Persona prioritaire |
|---|---|---|---|
| 1 | Comment automatiser WhatsApp en Afrique francophone | TOFU | Aïcha (e-commerce) + tous |
| 2 | ROI d'un agent IA pour PME : combien ça rapporte | MOFU | Tous |
| 3 | Audit IA d'entreprise : par où commencer en 2026 | MOFU → BOFU | Tous |
| 4 | Tri CV automatique : comment l'IA transforme le recrutement | MOFU | **Jean-Baptiste (priorité absolue)** |
| 5 | Make, n8n ou Zapier : quel outil pour une PME africaine ? | TOFU/MOFU | Décideurs tech-curieux |

---

## Calendrier de publication suggéré

> Cadence recommandée : **1 article tous les 10 jours** pendant 2 mois,
> puis 1/mois en maintenance. Mieux vaut un calendrier tenable qu'un
> sprint qui s'écroule au 3ᵉ article.

| Semaine | Date approx. | Article | Action en parallèle |
|---|---|---|---|
| S1 | 20 mai 2026 | **#3** Audit IA — par où commencer | C'est le plus aligné avec l'offre actuelle (audit-first). Sert de hub vers le Calendly. |
| S3 | 1ᵉʳ juin 2026 | **#1** Automatiser WhatsApp | Article de masse, fort potentiel de trafic. |
| S5 | 11 juin 2026 | **#4** Tri CV automatique | Cible Jean-Baptiste, le persona priorité. |
| S7 | 22 juin 2026 | **#2** ROI agent IA PME | Article de conversion (lien direct vers Calendly). |
| S9 | 2 juillet 2026 | **#5** Make vs n8n vs Zapier | Article comparatif, attire le trafic « curieux tech ». |

---

## Architecture URL du blog

> Décision recommandée : **arborescence plate**
> (pas de catégorie dans l'URL → flexibilité éditoriale + URL courtes).

```
afriautomate.com/blog/                        ← page index
afriautomate.com/blog/automatiser-whatsapp-afrique-francophone
afriautomate.com/blog/roi-agent-ia-pme
afriautomate.com/blog/audit-ia-entreprise-2026
afriautomate.com/blog/tri-cv-automatique-recrutement
afriautomate.com/blog/make-n8n-zapier-pme-africaine
```

À chaque publication :
1. Ajouter l'URL au `sitemap.xml`
2. Lier l'article depuis la page index du blog
3. Lier l'article depuis **2 articles existants minimum** (interlinking)

---

## Charte de ton — à respecter dans chaque article

Source : `CLAUDE.md` du projet.

- **Français — public africain francophone**
- **Professionnel ET chaleureux** — jamais corporate-froid
- **Concret avant tout** — exemples chiffrés, situations réelles, prénoms locaux (Aïcha, Jean-Baptiste, Koffi)
- **On vend des résultats, pas de la technologie** — toujours répondre à
  « qu'est-ce que ça m'apporte concrètement ? »
- **Pas de jargon gratuit** — si on emploie un mot technique, on l'explique
  en 1 phrase
- **Pas de superlatifs creux** — bannir « solutions innovantes »,
  « transformation digitale », « excellence opérationnelle » sauf si étayé
- **Tutoiement = NON, vouvoiement = OUI** (registre B2B francophone Afrique)
- **Toujours finir par un CTA clair** (audit gratuit / Calendly)

Mention d'Aïcha, Jean-Baptiste, Koffi à privilégier comme exemples — ce sont
les 3 personas internes (cf. `CLAUDE.md`).

---

## Éléments communs à tous les articles

### Pied d'article (à appliquer aux 5)

```
─────────────────────────────
À propos d'AfriAutomate

AfriAutomate est l'agence d'automatisation IA dédiée aux PME africaines.
Basée à Cotonou, nous concevons des agents WhatsApp, du tri de CV
automatique et des workflows IA adaptés aux réalités locales : WhatsApp
comme canal principal, connexions instables, double devise FCFA/EUR.

Notre promesse : moins d'effort, plus de revenus. Et un audit IA gratuit
pour identifier vos vraies priorités avant tout déploiement.

[Réserver mon audit IA gratuit] → calendly.com/afriautomate
─────────────────────────────
```

### Auteur

Tous les articles signés **Cosme A. DENON · Fondateur & Directeur d'AfriAutomate**
jusqu'à recrutement d'un rédacteur dédié. Bio courte de 2 lignes en bas
d'article + photo (`assets/photos-equipe/fondateur.png`).

### Visuel hero — règles

- Format 1600 × 900 (16:9), JPEG optimisé < 200 KB
- Palette respectée : fond sombre `#0D1117`, accent `#FF8A00` et bleu `#2563EB`
- Pas de stock photo générique « femme africaine devant un ordinateur »
- Privilégier : captures d'écran annotées, schémas custom, visuels marque

### Schema markup à inclure dans chaque article (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[TITRE ARTICLE]",
  "image": "https://afriautomate.com/assets/blog/[slug]-hero.jpg",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": {
    "@type": "Person",
    "name": "Cosme A. DENON",
    "jobTitle": "Fondateur & Directeur d'AfriAutomate",
    "url": "https://afriautomate.com/#about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AfriAutomate",
    "logo": {
      "@type": "ImageObject",
      "url": "https://afriautomate.com/branding/lg_AfriAutomate.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://afriautomate.com/blog/[slug]"
  },
  "inLanguage": "fr"
}
```

Plus, si l'article contient une FAQ ou un guide pas-à-pas, ajouter
`FAQPage` ou `HowTo` en second bloc JSON-LD.

---

## Checklist pré-publication (à valider sur chaque brouillon)

- [ ] Title tag ≤ 60 caractères, inclut le mot-clé principal
- [ ] Meta description ≤ 155 caractères, avec CTA
- [ ] URL slug court, lowercase, kebab-case, sans accents
- [ ] H1 unique, inclut le mot-clé principal
- [ ] Mot-clé principal dans les **100 premiers mots**
- [ ] Au moins **3 H2** et plan logique
- [ ] **3 à 5 liens internes** vers la home + d'autres articles
- [ ] **2 liens externes** vers sources autoritatives (études, données chiffrées)
- [ ] Toutes les images ont un attribut `alt` descriptif
- [ ] Au moins **un encadré CTA** vers Calendly au milieu de l'article + un en bas
- [ ] Schema JSON-LD `BlogPosting` (+ `FAQPage` ou `HowTo` si applicable)
- [ ] Section FAQ intégrée à l'article (3-5 Q/R) → boost rich snippets
- [ ] Bio auteur + photo en pied
- [ ] Sitemap mis à jour avec la nouvelle URL
- [ ] Article relié depuis l'index `/blog/` + 2 articles existants
- [ ] Test Google Rich Results validé
- [ ] Test mobile (lisibilité, vitesse) validé

---

## Fichiers de ce dossier

| Fichier | Contenu |
|---|---|
| `README.md` | Ce document (calendrier, charte, checklist) |
| `01-automatiser-whatsapp-afrique.md` | Brief article #1 |
| `02-roi-agent-ia-pme.md` | Brief article #2 |
| `03-audit-ia-entreprise-2026.md` | Brief article #3 |
| `04-tri-cv-automatique-recrutement.md` | Brief article #4 |
| `05-make-n8n-zapier-comparatif.md` | Brief article #5 |
