/**
 * shared/snap.js
 * 画面右下の1ボタンで「次のセクション」、最終セクションでは「先頭へ」を行う。
 */
(function () {
  'use strict';

  var sections = Array.from(document.querySelectorAll('section[id]'));
  if (sections.length < 2) return;

  var currentIndex = 0;
  var navBtn = document.createElement('button');
  navBtn.className = 'snap-next-btn';
  navBtn.type = 'button';
  document.body.appendChild(navBtn);

  function iconSvg(direction, double) {
    var points;
    if (double) {
      points = direction === 'up'
        ? ['7 12 12 7 17 12', '7 17 12 12 17 17']
        : ['7 7 12 12 17 7', '7 12 12 17 17 12'];
    } else {
      points = [direction === 'up' ? '18 15 12 9 6 15' : '6 9 12 15 18 9'];
    }
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        points.map(function (point) {
          return '<polyline points="' + point + '"/>';
        }).join('') +
      '</svg>'
    );
  }

  function sectionLabel(section) {
    var heading = section.querySelector('h2');
    return heading ? heading.textContent.trim() : section.id;
  }

  function setButtonState(index) {
    currentIndex = index;
    var atLast = currentIndex >= sections.length - 1;
    navBtn.innerHTML = iconSvg(atLast ? 'up' : 'down', atLast);
    navBtn.classList.toggle('snap-next-btn--up', atLast);
    navBtn.setAttribute(
      'aria-label',
      atLast ? 'ページ先頭へ戻る' : '次へ: ' + sectionLabel(sections[currentIndex + 1])
    );
    navBtn.setAttribute(
      'title',
      atLast ? 'ページ先頭へ戻る' : '次へ: ' + sectionLabel(sections[currentIndex + 1])
    );
  }

  function getNearestSectionIndex() {
    var mid = window.innerHeight / 2;
    var best = 0;
    var bestDist = Infinity;
    sections.forEach(function (section, index) {
      var rect = section.getBoundingClientRect();
      var dist = Math.abs(rect.top + rect.height / 2 - mid);
      if (dist < bestDist) {
        best = index;
        bestDist = dist;
      }
    });
    return best;
  }

  function syncButton() {
    setButtonState(getNearestSectionIndex());
  }

  if ('IntersectionObserver' in window) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var index = sections.indexOf(entry.target);
        if (index !== -1) setButtonState(index);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (section) {
      activeObserver.observe(section);
    });
  }

  window.addEventListener('resize', syncButton, { passive: true });
  window.addEventListener('scroll', syncButton, { passive: true });

  navBtn.addEventListener('click', function () {
    currentIndex = getNearestSectionIndex();
    if (currentIndex >= sections.length - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
  });

  syncButton();
})();
