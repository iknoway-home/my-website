/**
 * shared/snap.js
 * Floating next-page button for scroll-snap navigation.
 * Works with all themes — each theme styles .snap-next-btn via its own CSS.
 */
(function () {
  'use strict';

  var sections = [];
  var els = document.querySelectorAll('section');
  for (var i = 0; i < els.length; i++) sections.push(els[i]);
  if (sections.length < 2) return;

  var currentIndex = 0;

  // ── Create floating button ─────────────────────────────
  var btn = document.createElement('button');
  btn.className = 'snap-next-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Next section');
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="6 9 12 15 18 9"/></svg>';
  document.body.appendChild(btn);

  // ── Track which section is in view ─────────────────────
  function updateCurrent() {
    var mid = window.innerHeight / 2;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    if (currentIndex !== best) {
      currentIndex = best;
      var isLast = currentIndex >= sections.length - 1;
      btn.classList.toggle('snap-next-btn--up', isLast);
      btn.setAttribute('aria-label', isLast ? 'Back to top' : 'Next section');
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { updateCurrent(); ticking = false; });
    }
  }, { passive: true });
  updateCurrent();

  // ── Button click: next section or back to top ──────────
  btn.addEventListener('click', function () {
    var target = currentIndex >= sections.length - 1
      ? sections[0]
      : sections[currentIndex + 1];
    target.scrollIntoView({ behavior: 'smooth' });
  });
})();
