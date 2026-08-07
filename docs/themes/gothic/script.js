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

  function renderArchive(id, items) {
    document.getElementById(id).innerHTML = items.map(function (item, index) {
      return '<li><span class="entry-number">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<div class="entry-copy"><h3>' + item.title + '</h3><p>' + item.comment + '</p></div>' +
        '<p class="entry-tags">' + item.tags.join(' · ') + '</p></li>';
    }).join('');
  }

  renderArchive('anime-list', data.anime);
  renderArchive('movies-list', data.movies);
  document.getElementById('contact-message').textContent = data.contact.message;
  document.getElementById('contact-social').innerHTML = data.social.map(function (social) {
    return '<a href="' + social.url + '" target="_blank" rel="noopener">' + social.name + '</a>';
  }).join('');
}());
