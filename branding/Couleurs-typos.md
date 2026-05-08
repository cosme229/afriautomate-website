# Charte graphique AfriAutomate — Couleurs & Typographies

> Référence rapide pour toute création visuelle (posts, carrousels, propositions, site).
> La charte complète (logo, déclinaisons, règles d'usage) est dans `Charte-graphique.pdf`.

---

## 1. Palette de couleurs

| Rôle | Nom | HEX | RGB | Usage |
|---|---|---|---|---|
| Primaire — fond sombre | Noir profond | `#0D1117` | 13, 17, 23 | Fonds principaux, arrière-plans premium, header sombre |
| Primaire — accent tech | Bleu tech | `#2563EB` | 37, 99, 235 | CTA, liens, éléments d'action, accents "digital/automatisation" |
| Secondaire — accent chaud | Orange chaud | `#FF8A00` | 255, 138, 0 | Highlights, badges "nouveau", accent énergie/Afrique |
| Secondaire — accent lumineux | Ambre | `#FFC107` | 255, 193, 7 | Mises en valeur ponctuelles, étoiles, récompenses |
| Neutre clair | Gris clair | `#F5F7FA` | 245, 247, 250 | Fonds de sections claires, cartes, séparateurs doux |

### Règles d'usage rapide

- **Dominante** : Noir profond + Blanc/Gris clair (60 % / 30 %).
- **Accent principal** : Bleu tech pour tout élément interactif.
- **Accent chaud** : Orange chaud pour 1 élément fort par visuel (pas plus, sinon ça sature).
- **Ambre** : usage parcimonieux, éviter en grande aplat.
- **Contraste** : toujours vérifier la lisibilité texte/fond (viser WCAG AA minimum).

---

## 2. Typographies

| Usage | Police | Graisse | Notes |
|---|---|---|---|
| Titres, H1/H2, éléments forts | **Montserrat** | Bold (700) | Impact, modernité |
| Corps de texte, paragraphes, légendes | **Poppins** | Regular (400) | Lisibilité, douceur |

### Règles typographiques

- Hiérarchie claire : jamais plus de 3 tailles différentes par visuel.
- Titres en Montserrat Bold, parfois en capitales pour les accroches courtes.
- Corps toujours en Poppins Regular — éviter Poppins Bold en bloc de texte (utiliser Montserrat si besoin d'emphase).
- Interligne corps : 1.4 à 1.6 pour la lisibilité.
- Jamais de serif, jamais d'italique décoratif.

### Fallbacks web

```
font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;  /* Titres */
font-family: 'Poppins', 'Segoe UI', Roboto, sans-serif;          /* Corps  */
```

---

## 3. À compléter manuellement

- [ ] Ajouter `Charte-graphique.pdf` dans ce dossier
- [ ] Déposer les versions du logo (SVG, PNG fond clair, PNG fond sombre, favicon) dans `01_Branding/Logo/`
- [ ] Définir si besoin une couleur "erreur" et "succès" pour les maquettes clients
