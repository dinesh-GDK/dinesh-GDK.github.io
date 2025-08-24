(function() {
  'use strict';

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  function getPreferredTheme() {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function toggleTheme() {
    const currentTheme = getStoredTheme() || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setStoredTheme(newTheme);
    setTheme(newTheme);
  }

  // Set theme on initial load
  setTheme(getPreferredTheme());

  // Listen for changes in system color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    const storedTheme = getStoredTheme();
    if (!storedTheme || storedTheme === 'auto') {
      setTheme(getPreferredTheme());
    }
  });

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Handle external nav button clicks (social media icons)
    const externalNavButtons = document.querySelectorAll('.nav-button[data-href]:not(.page-nav-button)');
    externalNavButtons.forEach(button => {
      button.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
          window.open(href, '_blank');
        }
      });
    });

    // Handle internal page navigation buttons
    const pageNavButtons = document.querySelectorAll('.page-nav-button[data-href]');
    pageNavButtons.forEach(button => {
      button.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      });
    });
  });
})();