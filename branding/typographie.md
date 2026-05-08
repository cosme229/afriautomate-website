# Typographie — AfriAutomate

> Source : `01_Branding/Couleurs-typos.md` (charte graphique interne)

---

## Polices officielles

| Usage | Police | Graisse | Code |
|---|---|---|---|
| Titres H1/H2/H3, éléments forts | **Montserrat** | Bold 700 | `font-weight: 700` |
| Corps de texte, paragraphes, légendes | **Poppins** | Regular 400 | `font-weight: 400` |

---

## Import Google Fonts (à placer dans `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
```

---

## Variables CSS recommandées

```css
:root {
  --font-titres: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --font-corps:  'Poppins', 'Segoe UI', Roboto, sans-serif;
  --weight-bold:    700;
  --weight-regular: 400;
  --weight-semi:    600;
  --line-height-corps: 1.6;
  --line-height-titre: 1.2;
}

h1, h2, h3, .titre { font-family: var(--font-titres); font-weight: var(--weight-bold); }
p, li, span, .corps { font-family: var(--font-corps); font-weight: var(--weight-regular); }
```

---

## Règles typographiques

- Jamais plus de **3 tailles différentes** par section visuelle
- Titres en Montserrat Bold, parfois en **CAPITALES** pour les accroches courtes
- Corps toujours en Poppins Regular — éviter Poppins Bold en bloc de texte
- **Interligne corps** : 1.4 à 1.6 pour la lisibilité
- **Jamais de serif**, jamais d'italique décoratif
- Hiérarchie claire : H1 > H2 > H3 > corps

---

## Échelle typographique suggérée (mobile-first)

| Élément | Mobile | Desktop |
|---|---|---|
| H1 hero | 2rem (32px) | 3.5rem (56px) |
| H2 section | 1.5rem (24px) | 2.25rem (36px) |
| H3 sous-titre | 1.25rem (20px) | 1.5rem (24px) |
| Corps | 1rem (16px) | 1.0625rem (17px) |
| Caption/label | 0.875rem (14px) | 0.875rem (14px) |

---

## Alternatives si Google Fonts indisponible

```css
font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Titres */
font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  /* Corps  */
```
