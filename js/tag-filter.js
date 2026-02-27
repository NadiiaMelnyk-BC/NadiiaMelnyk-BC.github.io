/**
 * Tag Filter for Articles Page
 * - Filters article cards by tag
 * - Shows/hides cards using data-tags attribute
 * - Handles "All" to reset filter
 * - Shows empty state when no results match
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterContainer = document.querySelector('.tag-filter');
    if (!filterContainer) return;

    var buttons = filterContainer.querySelectorAll('.tag-filter__btn');
    var cards = document.querySelectorAll('.article-card[data-tags]');
    var noResults = document.querySelector('.no-results');
    var countEl = document.querySelector('.articles-count');

    function filterByTag(tag) {
      var visibleCount = 0;

      cards.forEach(function (card) {
        if (tag === 'all') {
          card.setAttribute('data-hidden', 'false');
          card.closest('.card').style.display = '';
          visibleCount++;
        } else {
          var cardTags = (card.getAttribute('data-tags') || '').toLowerCase();
          var match = cardTags.indexOf(tag.toLowerCase()) !== -1;
          card.setAttribute('data-hidden', match ? 'false' : 'true');
          card.closest('.card').style.display = match ? '' : 'none';
          if (match) visibleCount++;
        }
      });

      // Update active button
      buttons.forEach(function (btn) {
        btn.classList.remove('tag-filter__btn--active');
        if (btn.getAttribute('data-tag') === tag) {
          btn.classList.add('tag-filter__btn--active');
        }
      });

      // Show/hide no results message
      if (noResults) {
        if (visibleCount === 0 && cards.length > 0) {
          noResults.classList.add('no-results--visible');
        } else {
          noResults.classList.remove('no-results--visible');
        }
      }

      // Update count
      if (countEl && cards.length > 0) {
        countEl.textContent = visibleCount + ' article' + (visibleCount !== 1 ? 's' : '');
      }
    }

    // Attach click handlers
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-tag');
        filterByTag(tag);
      });
    });
  });
})();
