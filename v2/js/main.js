/* =========================================================
   v2 behaviour — mobile nav, sticky header, scroll reveal,
   active section highlighting
   ========================================================= */

(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  /* ---------- mobile menu ---------- */
  function closeMenu() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- sticky header shadow ---------- */
  function onScroll() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 10);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll(
    '.hero-copy, .hero-visual, .stats, .work-card, .service, .bento-item, .about-media, .about-copy, .contact-copy, .contact-form'
  );

  if ('IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 3, 2) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- active nav link ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (sec) { spy.observe(sec); });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
