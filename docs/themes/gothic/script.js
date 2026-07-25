(function () {
  'use strict';
  var d = window.__data; if (!d) return;
  document.getElementById('hero-name').textContent=d.profile.name; document.getElementById('hero-role').textContent=d.profile.role;
  document.getElementById('hero-tagline').innerHTML=d.profile.tagline.replace(/\n/g,'<br>');
  document.getElementById('about-paragraphs').innerHTML=d.profile.about.map(function(t){return '<p>'+t+'</p>';}).join('');
  document.getElementById('about-facts').innerHTML=d.profile.facts.map(function(f){return '<li><span>'+f.label+'</span><b>'+f.value+'</b></li>';}).join('');
  function render(id,items){document.getElementById(id).innerHTML=items.map(function(x,i){return '<article class="work reveal"><span class="number">0'+(i+1)+'</span><h3>'+x.title+'</h3><p>'+x.comment+'</p><div class="tags">'+x.tags.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div></article>';}).join('');}
  render('anime-grid',d.anime); render('movies-grid',d.movies); document.getElementById('contact-message').textContent=d.contact.message;
  document.getElementById('contact-social').innerHTML=d.social.map(function(s){return '<a href="'+s.url+'" target="_blank" rel="noopener">'+(s.icon||'')+s.name+'</a>';}).join('');
  var reveal=document.querySelectorAll('.reveal'); if(window.__utils.prefersReducedMotion()){reveal.forEach(function(e){e.classList.add('visible');});return;} var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.12}); reveal.forEach(function(e){io.observe(e);});
}());
