# Pooja Jaiswal — AI/ML Portfolio

A premium, recruiter-focused portfolio for **Pooja Jaiswal** — Data Scientist | AI/ML Engineer |
Generative AI & Agentic AI.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and
**Lucide React**. Dark-first design, fully responsive, accessible, SEO-ready, and deployable to
Vercel with zero configuration.

---

## 1. Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript type check
```

Requires Node.js 18.18+ (tested on Node 24).

---

## 2. What to replace before going live

Everything below is a one-line edit. Nothing is hard-coded in components.

| # | What | Where | Notes |
|---|------|-------|-------|
| 1 | **LinkedIn URL** | `lib/config.ts` → `socials.linkedin` | Currently `''`. While empty, the LinkedIn button renders **disabled** with a tooltip instead of linking somewhere wrong. |
| 2 | **GitHub URL** | `lib/config.ts` → `socials.github` | Same behaviour as above. |
| 3 | **Resume PDF** | `public/resume/Pooja-Jaiswal-Resume.pdf` | Overwrite the placeholder file, keeping the filename. Every "Download Resume" button already points at it. |
| 4 | **Profile photo** (optional) | `public/images/profile.jpg` + `lib/config.ts` → `profilePhoto: '/images/profile.jpg'` | While empty, an elegant "PJ" monogram is shown. |
| 5 | **Project repo / demo links** | `lib/content.ts` → each project's `github` / `demo` | `null` renders an honest "Code not published" / "Demo coming soon" chip. Paste a URL and it becomes a working button automatically. |
| 6 | **Certificate verification links** | `lib/content.ts` → `certifications[].credentialUrl` | `null` shows "Certificate on file". Add a URL and a "Verify credential" link appears. |
| 7 | **Live site URL** | `NEXT_PUBLIC_SITE_URL` env var (or `lib/config.ts` → `url`) | Used for canonical URL, sitemap, and social share cards. |

> **Design rule used throughout:** no invented links, repos, metrics, testimonials, or logos.
> Anything not yet available renders a clear placeholder state rather than a fake value.

---

## 3. Editing content

All copy lives in two files — no component edits needed:

- **`lib/config.ts`** — name, title, location, email, phone, social URLs, resume path,
  navigation items.
- **`lib/content.ts`** — hero copy, about text, skill groups, experience, projects,
  research cards, education, certifications, contact copy.

Example — adding a skill:

```ts
// lib/content.ts
{
  id: 'rag',
  title: 'RAG & Search Technologies',
  icon: 'Search',
  blurb: '...',
  skills: ['Retrieval-Augmented Generation', 'Embeddings', 'Your New Skill'],
  tracks: ['ai'],
}
```

Example — adding a project (it is picked up by the filter chips automatically):

```ts
{
  id: 'my-project',
  title: 'My New Project',
  category: 'genai',        // 'genai' | 'cv' | 'security' | 'ml'
  visual: 'agents',         // reuses one of the built-in illustrations
  tagline: '...',
  problem: '...',
  solution: '...',
  architecture: ['Step 1', 'Step 2', 'Step 3'],
  features: ['...'],
  stack: ['Python'],
  github: null,             // or 'https://github.com/you/repo'
  demo: null,
}
```

Icons are referenced by name and resolved through `components/ui/Icon.tsx`. To use a new Lucide
icon, add it to the registry in that file first (this keeps the bundle small).

---

## 4. Contact form

The form works **with no configuration**: if no email provider is set, `POST /api/contact`
returns `501` and the client falls back to opening the visitor's mail app with the message
pre-filled, plus a visible note with the direct email address.

To receive submissions in the inbox instead:

1. Create a free account at [resend.com](https://resend.com) and verify a sender.
2. Add these environment variables (locally in `.env.local`, and in Vercel → Project →
   Settings → Environment Variables):

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=iampoojajaiswal7440@gmail.com
CONTACT_FROM_EMAIL=portfolio@yourverifieddomain.com
```

3. Redeploy. Submissions now arrive by email with the sender's address set as `reply_to`.

See `.env.example` for the full list. The endpoint validates every field server-side, caps field
lengths, escapes HTML, and silently absorbs honeypot submissions from bots.

---

## 5. Deploying to Vercel

**Option A — dashboard (recommended)**

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Framework preset is detected as **Next.js** — no build settings to change.
4. Add `NEXT_PUBLIC_SITE_URL` (your final domain) under Environment Variables, plus the
   optional Resend variables from section 4.
5. Click **Deploy**.

**Option B — CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the live domain and redeploy so the
canonical URL, `sitemap.xml`, and social cards point at the right host.

---

## 6. Project structure

```
.
├── app/
│   ├── api/contact/route.ts     # contact endpoint (+ mailto fallback contract)
│   ├── globals.css              # design tokens, component primitives, keyframes
│   ├── icon.svg                 # favicon (monogram + neural motif)
│   ├── layout.tsx               # fonts, SEO metadata, JSON-LD, app shell
│   ├── opengraph-image.tsx      # social share card, generated at build time
│   ├── page.tsx                 # section composition
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── BackgroundFX.tsx         # canvas particle constellation + grid + orbs
│   ├── BackToTop.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx               # sticky nav, active section, scroll progress, mobile menu
│   ├── Preloader.tsx
│   ├── ThemeProvider.tsx        # dark/light with no flash of wrong theme
│   ├── ThemeToggle.tsx
│   ├── sections/
│   │   ├── Hero.tsx  HeroVisual.tsx        # interactive neural network + floating tech labels
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx  ProjectVisual.tsx # per-project SVG architecture illustrations
│   │   ├── Research.tsx
│   │   ├── Education.tsx                   # education + certifications
│   │   └── Contact.tsx
│   └── ui/
│       ├── Icon.tsx             # explicit Lucide registry
│       ├── Links.tsx            # social / external links with honest disabled states
│       ├── Reveal.tsx           # scroll reveal + stagger primitives
│       ├── Section.tsx          # consistent section rhythm + scroll anchors
│       └── SectionHeading.tsx
├── lib/
│   ├── config.ts                # identity, links, nav  ← EDIT ME FIRST
│   ├── content.ts               # all page copy          ← EDIT ME SECOND
│   └── motion.ts                # shared easing + variants
└── public/
    ├── images/                  # optional profile photo
    └── resume/                  # resume PDF (placeholder included)
```

---

## 7. Design system

Tokens are CSS custom properties in `app/globals.css`, exposed to Tailwind in
`tailwind.config.ts`. Change a colour once and the whole site (including the SVG illustrations,
which read the same variables) follows.

| Token | Dark | Light |
|-------|------|-------|
| `bg` | `#05070D` | `#F7F9FD` |
| `bg-soft` | `#090D18` | `#FFFFFF` |
| `surface` | `#0E1321` | `#FFFFFF` |
| `ink` (text) | `#E8EDF7` | `#0B1220` |
| `muted` | `#8F9DB6` | `#53617A` |
| `accent` (electric blue) | `#60A5FA` | `#2563EB` |
| `violet` | `#956CFF` | `#7C3AED` |
| `cyan` | `#22D3EE` | `#0891B2` |

Type: **Sora** for display, **Inter** for body, **JetBrains Mono** for technical labels — all
self-hosted automatically by `next/font` (no render-blocking requests to Google).

Utility classes worth knowing: `.shell` (page container), `.glass` / `.glass-strong`,
`.card` / `.card-hover`, `.btn-primary` / `.btn-secondary` / `.btn-ghost`, `.tag`, `.chip`,
`.field`, `.gradient-text`, `.eyebrow`, `.hairline`.

---

## 8. Performance & accessibility notes

- **~180 kB first-load JS**, one static page, no external runtime dependencies or paid APIs.
- The background canvas caps particle count by viewport, caps DPR at 2, pauses its
  `requestAnimationFrame` loop when the tab is hidden, and is **skipped entirely** under
  `prefers-reduced-motion`.
- Every animation respects `prefers-reduced-motion` (CSS animations are neutralised globally and
  Framer Motion uses `useReducedMotion`).
- Semantic landmarks, one `h1`, labelled sections, visible focus rings, `aria-pressed` filter
  buttons, `aria-live` form status, `aria-expanded` disclosures, a skip link, and alt text /
  `role="img"` labels on the decorative SVG diagrams.
- Theme is applied by an inline script before first paint, so there is no flash of the wrong
  theme and the choice persists in `localStorage`.
- SEO: full metadata, Open Graph + Twitter cards, generated OG image, `robots.txt`,
  `sitemap.xml`, and `Person` JSON-LD structured data.

---

## 9. Known placeholders

These are intentional and listed so nothing ships by accident:

1. `public/resume/Pooja-Jaiswal-Resume.pdf` — valid PDF, but placeholder text.
2. `socials.linkedin` / `socials.github` — empty; buttons render disabled until set.
3. All project `github` / `demo` links — `null`; chips show "not published" / "coming soon".
4. All `credentialUrl` values — `null`; cards show "Certificate on file".
5. `profilePhoto` — empty; the monogram card is shown instead.
