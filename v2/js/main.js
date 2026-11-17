/* =========================================================
   v2 behaviour — mobile nav, sticky header, scroll reveal,
   active section highlighting
   ========================================================= */

(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    '.section-head, .work-card, .service, .bento-item, .about-media, .about-copy, .contact-copy, .contact-form'
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

  /* ---------- rotating headline word ---------- */
  var rotator = document.getElementById('rotator');
  var words = ['automation builder', 'dashboard builder', 'problem solver', 'tool builder'];
  var wIndex = 0;

  if (rotator && !reduceMotion) {
    setInterval(function () {
      rotator.classList.remove('in');
      rotator.classList.add('out');
      setTimeout(function () {
        wIndex = (wIndex + 1) % words.length;
        rotator.textContent = words[wIndex];
        rotator.classList.remove('out');
        rotator.classList.add('in');
      }, 340);
    }, 3400);
  }

  /* ---------- portrait tilt on pointer ---------- */
  var tilt = document.getElementById('tilt');
  if (tilt && window.matchMedia('(hover: hover)').matches && !reduceMotion) {
    var hero = tilt.closest('.hero-visual') || tilt.parentNode;
    hero.addEventListener('mousemove', function (e) {
      var r = tilt.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform =
        'perspective(900px) rotateY(' + (px * 10).toFixed(2) + 'deg) rotateX(' +
        (-py * 10).toFixed(2) + 'deg)';
    });
    hero.addEventListener('mouseleave', function () {
      tilt.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
    });
  }

  /* ---------- animated particle background ---------- */
  var canvas = document.getElementById('bgCanvas');

  if (canvas && canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var dots = [];
    var W = 0, H = 0, raf = null;

    function sizeCanvas() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      var count = W < 700 ? 26 : 64;
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.7
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.fill();

        for (var j = i + 1; j < dots.length; j++) {
          var o = dots[j];
          var dx = d.x - o.x;
          var dy = d.y - o.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = 'rgba(56, 189, 248, ' + (0.16 * (1 - dist / 130)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    sizeCanvas();
    seed();
    start();

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        sizeCanvas();
        seed();
      }, 200);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
