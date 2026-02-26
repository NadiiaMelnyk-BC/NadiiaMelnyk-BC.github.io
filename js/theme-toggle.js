/**
 * Dark/Light Theme Toggle
 * - Saves preference to localStorage
 * - Respects prefers-color-scheme on first visit
 * - Toggles data-theme attribute on <html>
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'theme-preference';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage not available
    }
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Apply theme immediately (before DOM is fully loaded)
  var stored = getStoredTheme();
  var currentTheme = stored || getSystemTheme();
  applyTheme(currentTheme);

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Set up toggle button when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      setStoredTheme(next);
    });
  });
})();
