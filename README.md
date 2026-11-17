# Sabbir Molla — Portfolio

Personal portfolio site of **Sabbir Molla** (frontend developer & graphic designer).

| | |
|---|---|
| **Live site** | https://developerx.site |
| **Hosting** | Cloudflare Pages (free plan) |
| **Domain** | developerx.site (Cloudflare DNS) |
| **Stack** | Plain HTML + CSS + JavaScript (no build step) |
| **Repo** | GitHub → auto-deploys on every `push` |

---

## Ek nodirte shuru (Bangla quick start)

```powershell
cd "E:\Programmng Space\Portfolio"

.\preview.ps1                 # 1) nijer PC te dekho -> http://localhost:5500
.\deploy.ps1 "ki change korlam"   # 2) live kore dao -> ~40 sec por site update
```

Bas. Edit koro → `deploy.ps1` → live. Extra kichu korte hobe na.

---

## 1. File map

```
Portfolio/
├── index.html          <- main page (all sections: home, about, services, portfolio, contact)
├── css/
│   └── style.css       <- ALL styling + light/dark theme variables
├── js/
│   └── script.js       <- menu toggle, typed text, scroll reveal, theme toggle, 3D particle bg
├── images/             <- photos + 6 project thumbnails
├── favicon.svg         <- browser tab icon
├── 404.html            <- custom not-found page
├── robots.txt          <- tells search engines what to crawl
├── sitemap.xml         <- page list for Google
├── _headers            <- security + cache headers (Cloudflare Pages only)
├── deploy.ps1          <- one-command publish
├── preview.ps1         <- local preview server
└── _original/          <- BACKUP of your original files (not deployed, not pushed)
```

`_original/` holds your untouched starting files, because the originals were **mis-named**:
`script.js` actually contained CSS and `style.css` actually contained JS. That's why the
site had no working styles/animations before. Everything is now in the right place.

---

## 2. How to edit (and push) any time

### 2.1 The 3 files you'll touch 95% of the time

| I want to change... | Open |
|---|---|
| Text, headings, links, project cards, contact info | `index.html` |
| Colors, font sizes, spacing, layout, animations | `css/style.css` |
| Typing animation words, behaviour, 3D background | `js/script.js` |

**Colors** live in one place — the top of `css/style.css`:

```css
:root {
  --bg-color: #081b29;      /* dark background */
  --second-bg-color: #0c2b3f;
  --text-color: #ededed;
  --main-color: #00abf0;    /* accent / link color */
}
```

Change those four values and the whole site (including the light theme) follows.

### 2.2 The daily loop

```powershell
cd "E:\Programmng Space\Portfolio"

# ...edit files in VS Code...

.\preview.ps1                     # check it locally, then Ctrl+C
.\deploy.ps1 "added new project"  # commit + push -> Cloudflare auto-deploys
```

`deploy.ps1` without a message uses `update site - YYYY-MM-DD HH:mm`.

### 2.3 Raw git (if you prefer doing it manually)

```powershell
git add -A
git commit -m "your message"
git push
```

---

## 3. One-time hosting setup (already scripted, ~3 minutes of clicking)

The repo is ready and pushed. The last step is clicking "connect" inside Cloudflare —
it can't be automated because it needs your account login.

1. Go to **https://dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub if asked, then pick the repo **`portfolio`** → **Begin setup**.
3. Fill in exactly this:

   | Field | Value |
   |---|---|
   | Project name | `developerx` |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | *(leave empty)* |
   | Build output directory | `/` *(leave empty or a single `/`)* |

4. **Save and Deploy** → wait ~30 s → you get `developerx.pages.dev`.
5. **Custom domains** → **Set up a custom domain** → type `developerx.site` → **Continue** → **Activate**.
6. Repeat with `www` if you also want `www.developerx.site` (optional).

Because `developerx.site` already uses Cloudflare nameservers
(`ignacio.ns.cloudflare.com`, `sandra.ns.cloudflare.com`), Cloudflare adds the DNS record
itself — **no manual DNS editing, no waiting hours, SSL certificate is automatic**.

From then on: `git push` → live in ~40 seconds.

---

## 4. Why Cloudflare Pages

| Provider | Free forever? | Bandwidth | Builds | Custom domain + SSL | Verdict |
|---|---|---|---|---|---|
| **Cloudflare Pages** | Yes | **Unlimited** (unlimited static requests) | 500/month | Free, automatic | ✅ Best for this site |
| GitHub Pages | Yes | ~100 GB/month (soft) | 10/hour | Free, but **repo must be public** | Good fallback |
| Netlify (Free) | Yes | ~100 GB/month | ~300 build min/month | Free | Fine, stricter limits |
| Vercel (Hobby) | Yes | ~100 GB/month | 6,000 build min/month | Free | Non-commercial only |
| Render (Static) | Yes | ~100 GB/month | — | Free | OK, slower CDN |

Cloudflare Pages limits that matter for a portfolio (current docs): 500 builds/month,
20,000 files per deployment, 25 MiB max per file, 100 projects per account, **no bandwidth
cap and no request cap**. Your heaviest file is `images/home.png` at ~1.1 MB — far under
every limit. Source: <https://developers.cloudflare.com/pages/platform/limits/>

Translation: this portfolio will stay online for free with **zero bandwidth bills**, no
matter how many visitors it gets.

---

## 5. Contact form

The form posts to **FormSubmit** (`https://formsubmit.co/…`) — a free service that forwards
submissions to email with no backend, no API key, no monthly limit worth worrying about.

**One-time activation:** submit the form once on the live site, then click the confirmation
link that FormSubmit emails to `sabbirofficial44@gmail.com`. Until you do that, submissions
won't arrive.

Want to change the receiving email? Edit this line in `index.html`:

```html
<form action="https://formsubmit.co/YOUR-EMAIL-HERE" method="POST">
```

Alternatives if you ever want them: Formspree, Web3Forms, or Google Forms embed.

---

## 6. Troubleshooting

| Problem | Fix |
|---|---|
| `deploy.ps1` won't run ("running scripts is disabled") | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| Push asks for a password | `gh auth login` (use HTTPS + browser) |
| Site shows old version after push | Cloudflare dashboard → your project → **Deployments** → check the latest build log |
| CSS/JS 404 in the browser console | You moved a file — keep `css/style.css` and `js/script.js` paths, or update the `<link>`/`<script>` tags in `index.html` |
| Images not showing | File names are case-sensitive on the server. `Home.PNG` ≠ `home.png` |
| Custom domain stuck on "pending" | Confirm the domain's nameservers are still Cloudflare's — which they are, per your registrar panel |

---

## 7. What changed from your original files

- `Sabbir's Portfolio.html` → **`index.html`** (a file name with a space and an apostrophe breaks most hosts).
- Swapped-back CSS and JS: `script.js` → `css/style.css`, `style.css` → `js/script.js`, and pointed the
  `<link>`/`<script>` tags at the new paths. The site's styling, menu, animations and 3D background now actually load.
- Removed a duplicate `class` attribute and a stray `</p>` in the home section (invalid HTML).
- Fixed visible typos: Fontend → Frontend, Grapic → Graphic, Dwonload CV → Hire Me (now scrolls to contact),
  Moblie → Mobile, "All Rights Reversed" → "All Rights Reserved".
- Contact form is wired to FormSubmit instead of `action="#"`, so it actually sends mail.
- Added: SEO meta + Open Graph tags, `favicon.svg`, lazy-loaded project images, alt text,
  `404.html`, `robots.txt`, `sitemap.xml`, `_headers`.
- Footer year is now automatic (`new Date().getFullYear()`).
- Original files are preserved untouched in `_original/`.

---

## 8. Backlog ideas (optional)

- Real links on the social icons + project cards (`href="#"` right now).
- Add your CV PDF and link the "Hire Me" / a "Download CV" button to it.
- Replace heavy PNGs with WebP (≈70% smaller) for faster loads.
- Split the one-page layout into `/blog` or `/projects` pages later if it grows.
