// Client-side tag + search filter for /writing/.
//
// Filter chips are rendered with [data-filter-tag="all"] or [data-filter-tag="<slug>"].
// Article rows / cards must carry [data-tags="slug1,slug2"] and a searchable
// title in [data-title].
//
// URL syncs to ?tag=<slug> so links from tag-cards land on a pre-filtered list.
(function () {
  var chips = document.querySelectorAll('[data-filter-tag]');
  if (!chips.length) return;

  var rows = document.querySelectorAll('[data-tags]');
  var searchInput = document.querySelector('[data-filter-search]');
  var emptyState = document.querySelector('[data-filter-empty]');
  var current = 'all';
  var query = '';

  function apply() {
    var visible = 0;
    rows.forEach(function (row) {
      var tags = (row.getAttribute('data-tags') || '').split(',');
      var title = (row.getAttribute('data-title') || '').toLowerCase();
      var tagOk = current === 'all' || tags.indexOf(current) !== -1;
      var searchOk = !query || title.indexOf(query) !== -1;
      var show = tagOk && searchOk;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    chips.forEach(function (chip) {
      var t = chip.getAttribute('data-filter-tag');
      chip.classList.toggle('solid', t === current);
    });
    if (emptyState) emptyState.style.display = visible === 0 ? '' : 'none';
  }

  function setTag(slug, push) {
    current = slug || 'all';
    if (push) {
      var url = new URL(window.location.href);
      if (current === 'all') url.searchParams.delete('tag');
      else url.searchParams.set('tag', current);
      window.history.replaceState({}, '', url.toString());
    }
    apply();
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      setTag(chip.getAttribute('data-filter-tag'), true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      query = (searchInput.value || '').toLowerCase().trim();
      apply();
    });
  }

  // Initial — read ?tag= from URL.
  var params = new URLSearchParams(window.location.search);
  var initial = params.get('tag');
  setTag(initial || 'all', false);
})();
