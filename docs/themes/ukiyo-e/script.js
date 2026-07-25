(function () {
  'use strict';
  var d = window.__data;
  if (!d) return;
  document.getElementById('hero-name').textContent = d.profile.name;
  document.getElementById('hero-role').textContent = d.profile.roleJp;
  document.getElementById('hero-tagline').innerHTML = d.profile.tagline.replace(/\n/g, '<br>');
  document.getElementById('about-paragraphs').innerHTML = d.profile.about.map(function (t) { return '<p>' + t + '</p>'; }).join('');
  document.getElementById('about-facts').innerHTML = d.profile.facts.map(function (f) { return '<li><b>' + f.label + '</b><span>' + f.value + '</span></li>'; }).join('');
  function list(id, items) { document.getElementById(id).innerHTML = items.map(function (x, i) { return '<article class="work reveal"><span class="number">' + String(i + 1).padStart(2, '0') + '</span><h3>' + x.title + '</h3><p>' + x.comment + '</p><div class="tags">' + x.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></article>'; }).join(''); }
  list('anime-grid', d.anime); list('movies-grid', d.movies);
  document.getElementById('contact-message').textContent = d.contact.message;
  document.getElementById('contact-social').innerHTML = d.social.map(function (s) { return '<a href="' + s.url + '" target="_blank" rel="noopener">' + (s.icon || '') + s.name + '</a>'; }).join('');
  if (!window.__utils.prefersReducedMotion()) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
}());
