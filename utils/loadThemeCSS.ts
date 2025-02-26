import updateFavicon from './updateFavicon'

/**
 * Load the CSS file for the theme
 */
export default function loadThemeCSS(themeName: string) {
  const exisistingThemeLink = document.querySelector('#currentTheme')
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = `css/themes/${themeName}.css`
  link.id = 'nextTheme'

  link.onload = () => {
    if (exisistingThemeLink) {
      exisistingThemeLink.remove()
    }
    link.id = "currentTheme"
  }
  document.head.appendChild(link)
  updateFavicon()
}
