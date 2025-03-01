import updateFavicon from './updateFavicon'

/**
 * Load the CSS file for the theme
 */
export default function loadThemeCSS(themeName: string) {
  const existingThemeLink = document.querySelector('#currentTheme')
  const link = document.createElement('link')
  const baseUrl = window.location.origin
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = `${baseUrl}/css/themes/${themeName}.css`
  link.id = 'nextTheme'

  link.onload = () => {
    if (existingThemeLink) {
      existingThemeLink.remove()
    }
    link.id = "currentTheme"
  }
  document.head.appendChild(link)
  updateFavicon(themeName)
}
