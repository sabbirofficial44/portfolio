// ===== mobile menu toggle =====
let menuIcon = document.querySelector('#menuicon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

// ===== read more toggle =====
const readMoreBtn = document.getElementById('btn');
const readMoreText = document.getElementById('read-more');

if (readMoreBtn && readMoreText) {
  readMoreBtn.addEventListener('click', () => {
    if (readMoreText.style.display === 'none') {
      readMoreText.style.display = 'block';
      readMoreBtn.textContent = 'Read Less';
    } else {
      readMoreText.style.display = 'none';
      readMoreBtn.textContent = 'Read More';
    }
  });
}

// ===== typed.js =====
if (window.Typed) {
  new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Automation Developer', 'Web Designer', 'UI/UX Designer'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
}

// ===== scroll reveal =====
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    distance: '40px',
    duration: 900,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    reset: false
  });

  sr.reveal('.home-content h3, .home-content h1, .home-content p, .home-content .social-media, .home-content .btn', { interval: 100, origin: 'left' });
  sr.reveal('.home-img', { origin: 'right' });
  sr.reveal('.about img', { origin: 'left' });
  sr.reveal('.about-content', { origin: 'right' });
  sr.reveal('.service h2, .portfolio h2, .contact h2', { origin: 'top' });
  sr.reveal('.service-box', { interval: 120, origin: 'bottom' });
  sr.reveal('.portfolio-box', { interval: 120, origin: 'bottom' });
  sr.reveal('.contact form', { origin: 'bottom' });
}

// ===== light / dark theme toggle =====
const themeToggle = document.getElementById('lightTheam');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light')) {
      icon.className = 'bx bx-moon';
      icon.innerHTML = ' Dark';
    } else {
      icon.className = 'bx bx-sun';
      icon.innerHTML = ' Light';
    }
  });
}

// ===== 3D tilt on service + portfolio boxes =====
document.querySelectorAll('.service-box, .portfolio-box').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== Three.js particle network background =====
(function initParticleField() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const PARTICLE_COUNT = window.innerWidth < 780 ? 80 : 200;
  const RANGE = 90;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * RANGE;
    positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
    positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE * 0.6;
    velocities.push({
      x: (Math.random() - 0.5) * 0.015,
      y: (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.01
    });
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00abf0,
    size: 0.6,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  const points = new THREE.Points(particleGeo, particleMat);
  scene.add(points);

  const lineGeo = new THREE.BufferGeometry();
  const maxLines = PARTICLE_COUNT * 6;
  const linePositions = new Float32Array(maxLines * 6);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00abf0,
    transparent: true,
    opacity: 0.1
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const LINK_DIST = 13;

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    const pos = particleGeo.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      if (Math.abs(pos[i * 3]) > RANGE / 2) velocities[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > RANGE / 2) velocities[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > RANGE * 0.3) velocities[i].z *= -1;
    }
    particleGeo.attributes.position.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines - 1; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines - 1; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_DIST) {
          linePositions[lineIdx * 6] = pos[i * 3];
          linePositions[lineIdx * 6 + 1] = pos[i * 3 + 1];
          linePositions[lineIdx * 6 + 2] = pos[i * 3 + 2];
          linePositions[lineIdx * 6 + 3] = pos[j * 3];
          linePositions[lineIdx * 6 + 4] = pos[j * 3 + 1];
          linePositions[lineIdx * 6 + 5] = pos[j * 3 + 2];
          lineIdx++;
        }
      }
    }
    lineGeo.setDrawRange(0, lineIdx * 2);
    lineGeo.attributes.position.needsUpdate = true;

    camera.position.x += (mouseX * 6 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 6 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    points.rotation.y += 0.0006;
    lines.rotation.y += 0.0006;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
// ===== footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== highlight active nav link on scroll =====
const navLinks = document.querySelectorAll('.navbar .nav-link');
const sections = document.querySelectorAll('section[id]');

if (navLinks.length && sections.length) {
  const setActive = () => {
    let current = 'home';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('current', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}
