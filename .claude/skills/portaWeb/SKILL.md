---
name: portaWeb
description: Use whenever working on this repo (portfolio-web / "profile-najib") — a bilingual (EN/ES) personal portfolio site built with React + Vite + Tailwind. Load this before editing content, components, translations, or styling so the project structure, the src/data/portfolioData.json schema, and the component-to-data wiring don't need to be re-explored from scratch.
---

# portaWeb — Portfolio Site Context

Personal portfolio of **Najib Alejandro Loera Rodriguez** (Computer Systems Engineer,
Culiacán, México). Vite + React 18 SPA, single page (`App.jsx`), Tailwind for styling,
Framer Motion for animation, React Three Fiber for the 3D floating mascot.

## Stack & commands

- `npm run dev` — dev server (Vite)
- `npm run build` — production build
- `npm run lint` — ESLint (`max-warnings 0`)
- `npm run preview` — preview the production build

## Project layout

```
src/
  App.jsx                    # Assembles the single-page layout
  main.jsx                   # Entry point, wraps App in LanguageProvider
  context/LanguageContext.jsx
  components/
    Navbar.jsx                # Logo, nav links, EN/ES toggle button
    Hero.jsx                  # Greeting, name, role, CTA (download CV), mascot
    FloatingMascot.jsx         # react-three-fiber 3D android mascot + animations
    AboutMe.jsx                # Title, photo, description, stats grid
    Skills.jsx                 # Skill icon grid (devicon classes)
    Experience.jsx             # Tabbed: companies / projects / certificates
  data/
    portfolioData.json         # ALL site copy — both languages, see schema below
  index.css                    # Tailwind layers + CSS var color tokens
public/
  profilePhoto.jpeg, CvEng.pdf, CvEsp.pdf
  logos/        # company & project logos referenced by urlImage
  certificates/ # certificate PDFs referenced by urlPdf
```

## Bilingual content system

`src/context/LanguageContext.jsx` is the single source of truth:

- `lang` state: `'en'` (default) or `'es'`, toggled by `toggleLanguage()`.
- `data` = `portfolioData[lang]` — everything language-specific.
- `common` = `portfolioData.general` — everything language-independent (skills list).
- Consume via `const { lang, data, common, toggleLanguage } = useLanguage();`

**Rule:** `portfolioData.json` has `en` and `es` top-level keys that must stay
**structurally identical** (same keys, same array lengths/order) — only string
values differ. `general` is shared and has no language variants.

## `src/data/portfolioData.json` schema

```
{
  "en": { ... },      // identical shape to "es"
  "es": { ... },
  "general": {
    "skills": [ { "name": "Docker", "icon": "devicon-docker-plain" }, ... ]
  }
}
```

Per-language object (`en` / `es`):

```
{
  "profile": {
    "name": "Najib Alejandro Loera Rodriguez",
    "im": "I'm" | "Soy",
    "carrer": "Computer Systems Engineer" | "...",   // note: key is "carrer" not "career"
    "description": "..."
  },
  "description": {
    "greeting": "Hello There!" | "...",
    "me": "...",                 // paragraph in Hero
    "status": "Currently accepting freelance projects" | "...",
    "btnText": "Download CV" | "Descargar CV",
    "urlCV": "/CvEng.pdf" | "/CvEsp.pdf"   // must point to a file in public/
  },
  "aboutMe": {
    "title": "...",
    "description": "...",
    "stats": [ { "value": "4+", "label": "YEARS EXPERIENCE" }, ... ],  // 4 entries
    "profilePhoto": "/profilePhoto.jpeg"
  },
  "skillTitle": "...",           // heading for the Skills section (nav label too)
  "experience": {
    "title": "...",              // heading for Experience section (nav label too)
    "info": "...",                // subtitle under the title
    "tabsTitle": ["...", "...", "..."],   // order: [companies, projects, certificates]
    "btnText": "...",             // button label on project cards
    "cardsExperience": {
      "companies": [
        { "urlImage": "...", "info": ["bullet", "bullet", "bullet"], "date": "MM/YYYY - ... Location" }
      ],
      "projects": [
        { "urlImage": "...", "info": ["bullet", ...], "text": "Project name" }
      ],
      "certificates": [
        { "urlPdf": "/certificates/x.pdf", "imageUrl": "https://...icon.png", "title": "..." }
      ]
    }
  }
}
```

## Component → data field map

| Component | Fields used |
|---|---|
| `Navbar.jsx` | `data.skillTitle`, `data.experience.title`, `toggleLanguage`, `lang` |
| `Hero.jsx` | `data.description.greeting`, `data.profile.im/name/carrer`, `data.description.me/urlCV/btnText` |
| `AboutMe.jsx` | `data.aboutMe.title/description/profilePhoto/stats[]`, `data.profile.name` (alt text) |
| `Skills.jsx` | `data.skillTitle`, `common.skills[]` (name + devicon icon class) |
| `Experience.jsx` | `data.experience.*` (tabs over `cardsExperience.companies/projects/certificates`) |
| `App.jsx` (contact section) | `data.description.status`, `data.description.me` |
| `FloatingMascot.jsx` | no JSON data — pure R3F/three.js scene + animation state |

## Editing rules

- **Adding/editing copy**: edit the matching key in **both** `en` and `es` blocks in
  `portfolioData.json`. Keep array lengths and order identical between languages
  (e.g. `experience.tabsTitle`, `aboutMe.stats`, and each `cardsExperience` list —
  entry `i` in `en` and entry `i` in `es` describe the same project/company/cert).
- **Adding a skill icon**: append to `general.skills` (shared, not per-language) using
  an available [devicon](https://devicon.dev) class name for `icon`.
- **Adding a project/company/certificate**: add one entry to the relevant array under
  `cardsExperience` in both `en` and `es`; drop the referenced image/logo into
  `public/logos/` and any PDF into `public/certificates/`, then reference it with a
  root-relative path (e.g. `/logos/newlogo.png`).
- **CV files** live at `public/CvEng.pdf` and `public/CvEsp.pdf`; `description.urlCV`
  must point to the file matching that language.

## Styling conventions

- Color tokens defined in `src/index.css` (`:root`) and mirrored in
  `tailwind.config.js` `theme.extend.colors`: `primary` (`#00E676`), `bg-dark`
  (`#121212`), `bg-card`, `text-main`, `text-muted`/`muted`, `glass-border`.
- Custom utility classes used throughout: `glass` (frosted card), `btn-primary`,
  `primary-glow`. Fonts: `font-inter` (body) and `font-outfit` (headings), loaded
  as Tailwind `fontFamily` extensions.
- Sections are anchored by id for nav scrolling: `#about`, `#skills`, `#experience`,
  `#contact`.
