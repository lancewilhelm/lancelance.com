(function () {
  try {
    const config = JSON.parse(localStorage.getItem('config') || '{}');
    const theme = config.theme || 'monochrome';

    // Set background color before Nuxt loads
    const root = document.documentElement;
    root.style.backgroundColor = '#111';
    root.style.color = '#fff';

    // Inject theme CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'currentTheme';
    link.href = `/css/themes/${theme}.css`;
    document.head.appendChild(link);
  } catch (e) {
    console.error('Theme loading error:', e);
  }
})();
