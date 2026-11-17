# QA findings — http://127.0.0.1:8811/ (read-only)

Tab used: built-in browser, tab-iab-2 (reloaded once). Page served OK (HTTP 200).

## Environment caveat
Built-in tab is reported "target-hidden", so CSS transitions/animations never advance
(all `document.getAnimations()` stuck at currentTime 0). ScrollReveal therefore leaves
hero/nav content at `opacity:0; translateX(-40px)` and `.portfolio-layer` frozen at 0.
For measurement/screenshots I neutralised transitions (`transition:none`), forced the
post-reveal end state (`[data-sr-id]{opacity:1}`), and disabled `backdrop-filter`
(headless layer artifact). Element-crop screenshots show the fixed header inside the crop.
390 measurements used device emulation = iPhone 14 (390x844, touch, `hover:none`).

## 390x844
- documentElement.scrollWidth 390 / innerWidth 390 / clientWidth 390 -> no horizontal overflow.
- Page height 8064px. Old page 5997px -> new page 34% TALLER (new automation section = 1584px).
- "Hire Me": top 718px, left 131px, 127x53 (above the 844 fold). Page total 8064px.
- Fonts: hero/about body <p> 16px (line-height 27.2); h1 38px ("Sabbir"); .heading (h2) 30px ("About Me").
  html/body base 10px, body font-size 10px.
- .portfolio-box count 6; .portfolio-layer computed opacity 1 on all 6 with `(hover: none)`
  (`@media (hover:none){.portfolio-layer{opacity:1;transform:none}}`). Titles visible:
  Land Page Design / E-Commerce Web Design / Portfolio Design / Custom Website Design /
  React Website Design / Web Design.
  NOTE: with a hover-capable engine at 390 the base rule wins -> opacity 0 (hover-only captions).
- Hamburger #menuicon: click adds `.navbar.active` (clip-path opens to 100%), icon -> bx-x,
  panel 390x404 at y=72; items: Home, About, Services, Automation (#automation), Portfolio, Contact, Light.
  Clicking "About" removes `.active` (menu closes, icon back to bx-menu) and scrolls to #about (scrollY 721).
- Hero paragraph is line-clamped to 6 lines (client 163px vs scrollHeight 435px, overflow hidden, "…").

Section offsets @390: home 0/801, about 801/948, service 1749/1841, automation 3590/1584,
portfolio 5174/1855, contact 7030/887. All sections have scroll-margin-top 80px (header 73-79px).

## 768x1024
- scrollWidth 758 vs innerWidth 768 (10px classic scrollbar; scrollWidth == clientWidth 758) -> no overflow.
- Page height 8861px.
- .portfolio-container grid-template-columns = 682.219px (1 column, 6 cards)
- .service-container  = 682.219px (1 column, 4 cards); .auto-grid also 1 column (6 cards)
- #menuicon display flex (hamburger visible); navbar clip-path collapsed (menu closed).

## 1440x900
- .auto-card count 6, all visible (378x159 each), .auto-grid columns = 377.53px x3 (2 rows), section 839px tall.
- Side facts: .portfolio-container 3 cols (374.2 x3), .service-container 2 cols (573.8 x2), page height 4976.
- #menuicon display none.

## Facebook icon (hero social row)
href attr = https://www.facebook.com/developerxx1 ; target=_blank ; rel="noopener noreferrer" ;
aria-label "Facebook page". Click opened new tab tab-iab-4 -> https://www.facebook.com/developerxx1 (closed).
Other social icons: Twitter/Instagram/LinkedIn all href="#".

## Console / network
- JS exceptions: none. console level=error: none.
- 22 requests, all status 200 (incl. unpkg scrollreveal redirect -> 200). No failed requests.

## Screenshots (workspace)
qa-390-1-hero.jpg, qa-390-2-services.jpg, qa-390-3-automation.jpg, qa-390-4-portfolio.jpg,
qa-390-5-contact.jpg, qa-390-6-menu-open.jpg, qa-768-top.jpg, qa-1440-automation.jpg
(plus throwaway: qa-390-hero.jpg, qa-390-scrollcheck.jpg)
