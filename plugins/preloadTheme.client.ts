// export default defineNuxtPlugin(() => {
//   if (process.client) {
//     const config = JSON.parse(localStorage.getItem('config') || '{}');
//     const theme = config.theme || 'monochrome';
//
//     const themeLink = document.getElementById('currentTheme') as HTMLLinkElement;
//     if (themeLink) {
//       themeLink.href = `/css/themes/${theme}.css`;
//     } else {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.id = 'currentTheme';
//       link.href = `/css/themes/${theme}.css`;
//       document.head.appendChild(link);
//     }
//   }
// });
