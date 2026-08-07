(function () {
  'use strict';
  var data = window.__data;
  if (!data) return;

  document.getElementById('hero-name').textContent = data.profile.name;
  document.getElementById('hero-role').textContent = data.profile.role;
  document.getElementById('hero-tagline').innerHTML = data.profile.tagline.replace(/\n/g, '<br>');
  document.getElementById('about-paragraphs').innerHTML = data.profile.about.map(function (text) {
    return '<p>' + text + '</p>';
  }).join('');
  document.getElementById('about-facts').innerHTML = data.profile.facts.map(function (fact) {
    return '<div><dt>' + fact.label + '</dt><dd>' + fact.value + '</dd></div>';
  }).join('');

  function renderNews(id, items) {
    document.getElementById(id).innerHTML = items.map(function (item, index) {
      var lead = index === 0 ? ' lead-article' : '';
      return '<article class="news-item' + lead + '"><p class="article-meta">Review ' + String(index + 1).padStart(2, '0') + '</p>' +
        '<h3>' + item.title + '</h3><p>' + item.comment + '</p><p class="article-tags">' + item.tags.join(' · ') + '</p></article>';
    }).join('');
  }

  renderNews('anime-list', data.anime);
  renderNews('movies-list', data.movies);
  document.getElementById('contact-message').textContent = data.contact.message;
  document.getElementById('contact-social').innerHTML = data.social.map(function (social) {
    return '<a href="' + social.url + '" target="_blank" rel="noopener">' + social.name + '</a>';
  }).join('');
}());
