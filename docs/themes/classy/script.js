/* ============================================================
   CLASSY THEME — script.js
   ============================================================ */

// ── Bento size helper ────────────────────────────────────
function bentoClass(i, total) {
  if (total === 9 && (i === 0 || i === 4 || i === 7)) return ' bento-wide';
  if (total === 6 && (i === 0 || i === 3)) return ' bento-wide';
  return '';
}

// ── Render shared data ───────────────────────────────────
(function renderData() {
  const d = window.__data;
  if (!d) return;

  // Hero
  const heroName = document.getElementById('hero-name');
  const heroRole = document.getElementById('hero-role');
  const heroTagline = document.getElementById('hero-tagline');
  if (heroName) heroName.textContent = d.profile.name;
  if (heroRole) heroRole.textContent = d.profile.role;
  if (heroTagline) heroTagline.innerHTML = d.profile.tagline.replace(/\n/g, '<br>');

  // GSAP SplitText — hero name
  requestAnimationFrame(function () {
    if (!window.__utils.prefersReducedMotion() && window.gsap && window.SplitText && heroName) {
      const split = new SplitText(heroName, { type: 'chars' });
      gsap.from(split.chars, {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.03, ease: 'power3.out',
      });
    }
  });

  // About paragraphs
  const aboutP = document.getElementById('about-paragraphs');
  if (aboutP) {
    aboutP.innerHTML = d.profile.about.map(t => '<p>' + t + '</p>').join('');
  }

  // About facts
  const factsUl = document.getElementById('about-facts');
  if (factsUl) {
    factsUl.innerHTML = d.profile.facts.map(f =>
      '<li><span>' + f.label + '</span>' + f.value + '</li>'
    ).join('');
  }

  // Anime grid
  const animeGrid = document.getElementById('anime-grid');
  if (animeGrid) {
    animeGrid.innerHTML = d.anime.map((a, i) =>
      '<article class="work-card reveal' + bentoClass(i, d.anime.length) + '">' +
        '<div class="work-number">' + String(i + 1).padStart(2, '0') + '</div>' +
        '<h3>' + a.title + '</h3>' +
        '<p>' + a.comment + '</p>' +
        '<div class="work-tags">' + a.tags.map(t => '<span>' + t + '</span>').join('') + '</div>' +
      '</article>'
    ).join('');
  }

  // Movies grid
  const moviesGrid = document.getElementById('movies-grid');
  if (moviesGrid) {
    moviesGrid.innerHTML = d.movies.map((m, i) =>
      '<article class="work-card reveal' + bentoClass(i, d.movies.length) + '">' +
        '<div class="work-number">' + String(i + 1).padStart(2, '0') + '</div>' +
        '<h3>' + m.title + '</h3>' +
        '<p>' + m.comment + '</p>' +
        '<div class="work-tags">' + m.tags.map(t => '<span>' + t + '</span>').join('') + '</div>' +
      '</article>'
    ).join('');
  }

  // Contact
  const contactMsg = document.getElementById('contact-message');
  const contactSocial = document.getElementById('contact-social');
  if (contactMsg) contactMsg.textContent = d.contact.message;
  if (contactSocial) {
    contactSocial.innerHTML = d.social.map(s =>
      '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.name + '">' +
      (s.icon ? '<span class="social-icon">' + s.icon + '</span>' : '') +
      '<span>' + s.name + '</span></a>'
    ).join('');
  }
})();

// ── Scroll-triggered header ───────────────────────────────
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Reveal on scroll ──────────────────────────────────────
// Fallback for browsers without CSS Scroll-Driven Animations (e.g. Safari)
if (!CSS.supports('animation-timeline', 'view()')) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const delay = siblings.indexOf(entry.target) * 90;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
}

// ── Active nav highlight ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--chalk)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));

// ── Subtle cursor trail (desktop only) ────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const TRAIL_LEN = 6;
  const trail = [];

  for (let i = 0; i < TRAIL_LEN; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: ${3 + i}px;
      height: ${3 + i}px;
      border-radius: 50%;
      background: rgba(212, 168, 48, ${0.16 - i * 0.02});
      transform: translate(-50%, -50%);
      transition: left ${0.04 + i * 0.03}s ease,
                  top  ${0.04 + i * 0.03}s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  document.addEventListener('mousemove', e => {
    trail.forEach(d => {
      d.style.left = e.clientX + 'px';
      d.style.top  = e.clientY + 'px';
    });
  });
}

// ── Parallax on hero light shaft ─────────────────────────
const lightShaft = document.querySelector('.hero-light-shaft');
if (lightShaft) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    lightShaft.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}
