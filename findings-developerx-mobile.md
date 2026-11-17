# developerx.site — mobile/tablet visual audit (READ-ONLY measurements)

Scope: https://developerx.site/ (one-page portfolio). No site changes made.
Browsers: user Chrome tab (tab-vtab-744429152) for 390px pass; user Chrome debugger became
unavailable mid-run ("another Chrome extension conflicts with browser control"), remaining
checks done in built-in Chromium (tab-iab-3) — numbers cross-checked (identical section count,
docH 5997, layout width 380 at a 390 viewport).

## 1. 390 x 844 (viewport 390, layout width 380 — 10px scrollbar gutter)

| item | value |
|---|---|
| documentElement.scrollWidth | 405 at first paint (= +15px vs innerWidth 390, +25px vs layout 380) / 380 after scroll-reveals finish |
| body.scrollWidth | 405 |
| total page height | 5997 px (7.1 screens) at 390; 7767 px at 768 |
| section count (`section`) | 5 |
| `section { min-height }` | 844px on all five (= 100vh, from `section { min-height:100vh }`) |
| section padding (computed) | 88px 15.19px 17.6px |

### Sections at 390
| id | top | rendered height | blank tail inside section | content bottom |
|---|---|---|---|---|
| home | 0 | 990 (1033 when the typed line wraps to 2 lines) | 18 | 972 |
| about | 990 | 889 | 17 | 872 |
| service | 1879 | 1238 | 54 | 1184 |
| portfolio | 3117 | 1917 | 26 | 1891 |
| contact | 5034 | 844 | 63 | 781 |
+ footer: 120 px (5878–5997), not a `<section>`.
Gap between sections: 0 px (sections abut; only the 17.6px bottom padding separates content).

### Computed values
| target | value |
|---|---|
| `.home-img img` | 264x264, border-radius 50%, natural 2048x2048, object-fit: fill, x 58→322 |
| `.about img` | 264x264, border-radius 17.6px, object-fit fill, x 98→362 (inside a 350px card) |
| `h1` ("Sabbir") | 39.6px / 43.56 lh, colour `rgba(0,0,0,0)` + `linear-gradient(90deg,#ededed,#00abf0)` background-clip text |
| `.heading` (h2) | 39.6px, lh normal |
| hero `.home-content h3` | 28.16px, 350px box |
| hero body `p` | 14.08px / 23.94 lh — 311 px tall = 13 lines |
| about `p` | 14.08px |
| nav link | 17.6px, 29px tall box |
| form inputs | 14.08px font, 49px tall; textarea 238px |
| root font-size | 8.8px (`html{font-size:62.5%}` then `@media(max-width:1200px){html{font-size:55%}}`) → 1rem = 8.8px |
| header | position fixed, 69px tall, rgba(8,27,41,.75) + backdrop blur(10px), z-index 100 |
| three.js canvas | 390x844 fixed, z-index 0, parent height 5997 (only first screen tall) |

### Hero stack at 390 (all above/below fold)
image y 88–352 (264) · "Hello! It's Me" 378–421 · "Sabbir" 426–470 · typed line 474–560 (2 lines)
· paragraph 573–884 (311px, 13 lines) · social row 906–943 · "Hire Me" 969–1015.
=> CTA starts at 969 px, i.e. 125 px below the 844 fold.

### Tap targets (px, w x h)
hamburger 32x32 · nav links 75-96 x 29 · social icons 37x37 · portfolio "View project" 40x40
(invisible, see #2) · footer back-to-top 35x35 · content buttons 113-137 x 46 (OK) · inputs 350x49 (OK).

### Portfolio cards
`.portfolio-box` 350x266; `img` 350x266 (`aspect-ratio:4/3; object-fit:cover`); `.portfolio-layer`
`position:absolute; inset:0; opacity:0; transform:translateY(17.6px)`; only
`.portfolio-box:hover .portfolio-layer{opacity:1;transform:none}` reveals it → on a touch device the
title / description / link of all 6 cards never render. Screenshot shows bare images only.

## 2. Nav / header behaviour (390)
- Closed state: `nav#navbar.navbar` display:flex, 380x350, `clip-path: polygon(0 0,100% 0,100% 0,0 0)`.
- Tap hamburger → class `active`, clip-path `polygon(0 0,100% 0,100% 100%,0 100%)`, icon bx-x.
  Menu = 380 x 350 solid panel at top 68px, centred links, covers hero image (88–352) and
  "Hello! It's Me" (378–421) completely; no scrim/backdrop, page behind stays visible from y 418.
- Header is `position: fixed` 69px with 75%-opaque background: any content scrolled under it
  (hero h1 at scrollY 546 sits at y −120..−77; paragraph lines at y 27+) shows through the
  69px band and is blurred → text visibly ghosts under the nav.

## 3. 768 x 1024 (tablet)
| id | height | blank tail |
|---|---|---|
| home | 1024 | 82 |
| about | 1024 | 121 |
| service | 1111 | 54 |
| portfolio | 3482 | 22 |
| contact | 1024 | 242 |
docH 7767 · scrollWidth 758 vs innerWidth 768 (no overflow) · section min-height 1024 (100vh).
Differences: everything stays single column — `.portfolio-box` 697x527 (6 stacked = 3272px inside a
3482px section), `.service-box` 697x286 full width, hero/about images still fixed 264x264
(34% of the column), h1/heading still 39.6px, hamburger still shown (`@media(max-width:768px)`),
17.6px nav links, contact form 1024 tall with 242px of dead space under it.

## 4. Console / network
0 JS exceptions, 0 console errors, 0 failed requests. All assets 200 (unpkg scrollreveal 4.0.9,
typed.js, boxicons, Poppins, portfolio1-6.jpg lazy). POST /cdn-cgi/rum 204.

## 5. Ranked problems (most damaging first)
1. Portfolio items are unlabelled on touch: `.portfolio-layer{opacity:0}` + `:hover`-only reveal, no
   `@media (hover:none)` fallback → 6 anonymous images, 0 titles, 0 links, over 1917px (390) / 3482px (768).
2. Tablet is an unadapted phone layout: single-column 697x527 cards, 264px fixed images, 39.6px h1,
   hamburger at 768 → page 7767px tall (7.6 screens) for one hero + 3 services + 6 images.
3. Huge type on small canvas: `html{font-size:55%}` (1rem=8.8px) yet `.heading{4.5rem}` = 39.6px
   and `h1{4.5rem}` = 39.6px → the name is the same size as section titles, and headings eat 350px width;
   simultaneously body text/inputs are 14.08px (and inputs <16px trigger iOS zoom).
4. Hero is 1.2 screens: 264px image + 350px of stacked headings + a 13-line/311px 14px paragraph;
   `Hire Me` (the only CTA) starts at 969px, below a 844px fold.
5. `section{min-height:100vh}` on every section: contact = exactly 844 with 63px of empty tail (242px at
   768), about 121px tail at 768 — full-screen blocks with no content to fill them.
6. Horizontal overflow at first paint: ScrollReveal pre-reveal transforms (`translateX(40px)` on
   `.about-content` → right edge 405; `translateX(-40px)` on `.social-media`/`.Hire Me` → left edge −25)
   make scrollWidth 405 vs innerWidth 390; masked only by `html{overflow-x:hidden}`.
7. Fixed 69px header with 75% opacity + blur: content ghosts through it; no scroll-margin-top /
   scroll-padding-top, so any anchor jump puts a section's first 69px under the header band.
8. Tap targets under 44px: hamburger 32x32, nav links 29px tall, social 37x37, back-to-top 35x35,
   portfolio link 40x40.
9. Menu panel has no scrim and no size relation to content (380x350 fixed, centred 17.6px links);
   it hides the hero image + first heading while the page below stays fully visible/dimmed-less.
10. Cosmetic: `h1` uses transparent fill + gradient text (invisible if background-clip fails);
    `.about-content .heading` declared twice (left then center); 6th portfolio image loads lazily and
    shifts nothing but the reveal delays text on scroll.
