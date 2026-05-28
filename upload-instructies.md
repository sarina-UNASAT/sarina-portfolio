# Sarina Portfolio – Upload Instructies

## Bestandsstructuur (vereist)

```
sarina-portfolio/
├── index.html
├── work.html
├── contact.html
├── css/
│   ├── main.css
│   ├── work.css
│   └── contact.css
├── js/
│   └── main.js
└── img/
    ├── profile-avatar.jpg   ← hernoemd van profile_avatar.jpg
    ├── project-1.png        ← hernoemd van project_1.png
    ├── project-2.png        ← hernoemd van project_2.png
    └── project-3.png        ← hernoemd van project_3.png
```

## Stap-voor-stap uploadinstructies

### 1. Verwijder oude bestanden
Verwijder in je GitHub repository:
- `style.css` (root)
- `script.js` (root)
- De `assets/` map

### 2. Upload nieuwe bestanden
Ga naar je repository op GitHub en upload:
- `index.html` (vervangt de bestaande)
- `work.html` (nieuw)
- `contact.html` (nieuw)
- Map `css/` met `main.css`, `work.css`, `contact.css`
- Map `js/` met `main.js`
- Map `img/` met afbeeldingen (let op kebab-case namen!)

### 3. Hernoem afbeeldingen (kebab-case!)
Je bestaande afbeeldingen in `assets/` moet je hernoemd uploaden naar `img/`:
| Oud (fout)           | Nieuw (correct)       |
|----------------------|-----------------------|
| profile_avatar.jpg   | profile-avatar.jpg    |
| profile_avatar.png   | profile-avatar.png    |
| project_1.png        | project-1.png         |
| project_2.png        | project-2.png         |
| project_3.png        | project-3.png         |

### 4. Controleer na upload
Alle checks moeten groen zijn:
- ✅ `index.html`, `work.html`, `contact.html` in root
- ✅ `css/main.css`, `css/work.css`, `css/contact.css`
- ✅ `js/main.js`
- ✅ `img/` map met afbeeldingen (kebab-case namen)
- ✅ Geen inline styles in HTML
- ✅ Alle HTML bestanden linken `css/main.css`
- ✅ `work.html` linkt `css/work.css`
- ✅ `contact.html` linkt `css/contact.css`
- ✅ `@media` queries aanwezig in CSS
- ✅ Alle bestandsnamen kebab-case
