// mode.js

// 1) Read mode from URL or localStorage
function getCurrentMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlMode = urlParams.get('mode');
  if (urlMode === 'dark' || urlMode === 'light') {
    localStorage.setItem('selectedMode', urlMode);
    return urlMode;
  }
  const stored = localStorage.getItem('selectedMode');
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return 'light'; // default
}

// 2) Apply the mode to the page
function applyMode(mode) {
  const isDark = (mode === 'dark');
  document.body.classList.toggle('dark-mode', isDark);

  // Glass wrapper
  const wrapper = document.getElementById('glassWrapper');
  if (wrapper) {
    wrapper.classList.toggle('glassmorph-dark', isDark);
    wrapper.classList.toggle('glassmorph', !isDark);
  }

  // Toggle link text
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  }
}

// 3) Update the URL param without reload
function updateURLParam(mode) {
  const url = new URL(window.location);
  url.searchParams.set('mode', mode);
  window.history.replaceState({}, '', url);
}

// 4) Update all internal links so they carry the mode param
function updateAllLinks() {
  const mode = localStorage.getItem('selectedMode') || 'light';
  document.querySelectorAll('a[href]').forEach(a => {
    // Only update links pointing to your pages (adjust selector as needed)
    if (a.hostname === window.location.hostname || a.getAttribute('href').startsWith('./') || a.getAttribute('href').match(/\.html/)) {
      const href = new URL(a.href, window.location);
      href.searchParams.set('mode', mode);
      a.href = href.toString();
    }
  });
}

// 5) Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const currentMode = getCurrentMode();
  applyMode(currentMode);
  updateURLParam(currentMode);
  updateAllLinks();

  // Hook up the toggle button/link
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const newMode = (document.body.classList.contains('dark-mode')) ? 'light' : 'dark';
      localStorage.setItem('selectedMode', newMode);
      applyMode(newMode);
      updateURLParam(newMode);
      updateAllLinks();
    });
  }
});
