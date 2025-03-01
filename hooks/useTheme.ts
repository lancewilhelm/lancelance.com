import { useState, useLayoutEffect, useRef } from 'react'
import loadThemeCSS from '@/utils/loadThemeCSS'

const THEME_STORAGE_KEY = 'theme'

/**
 * Custom hook to manage the current theme
 */
export function useTheme() {
  const isFirstRender = useRef(true)
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'monochrome'
    }
    return 'monochrome'
  })

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme)
      loadThemeCSS(currentTheme)
    }
  }, [currentTheme])

  return { currentTheme, setCurrentTheme }
}
