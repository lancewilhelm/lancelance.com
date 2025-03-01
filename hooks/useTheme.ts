import { useState, useLayoutEffect, useRef } from 'react'
import loadThemeCSS from '@/utils/loadThemeCSS'

const THEME_STORAGE_KEY = 'theme'

export function useTheme() {
  const isFirstRender = useRef(true)

  const getCookieTheme = () => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(new RegExp('(^| )' + THEME_STORAGE_KEY + '=([^;]+)'))
      return match ? match[2] : 'monochrome'
    }
    return 'monochrome'
  }

  const [currentTheme, setCurrentTheme] = useState(getCookieTheme)

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }

      // Set theme cookie
      loadThemeCSS(currentTheme)
      document.cookie = `${THEME_STORAGE_KEY}=${currentTheme}; path=/; max-age=31536000` // 1 year expiry
    }
  }, [currentTheme])

  return { currentTheme, setCurrentTheme }
}

