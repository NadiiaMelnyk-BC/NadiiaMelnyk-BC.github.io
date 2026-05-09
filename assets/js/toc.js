// Auto-generates the sticky table of contents from h2/h3 in the article body.
// Highlights the section currently in view as the user scrolls.
(function () {
  var list = document.querySelector('[data-toc-list]');
  var body = document.querySelector('.post-body');
  if (!list || !body) return;

  var headings = body.querySelectorAll('h2, h3');
  if (!headings.length) {
    var toc = document.querySelector('[data-toc]');
    if (toc) toc.style.display = 'none';
    return;
  }

  var links = [];
  var i = 1;
  headings.forEach(function (h) {
    if (!h.id) {
      var slug = (h.textContent || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60) || 'section-' + i;
      h.id = slug;
    }
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    if (h.tagName === 'H3') a.style.paddingLeft = '12px';
    list.appendChild(a);
    links.push(a);
    i++;
  });

  if (!('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var link = byId[e.target.id];
      if (!link) return;
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });

  headings.forEach(function (h) { observer.observe(h); });
})();
