'use client'

import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import loadThemeCSS from '@/utils/loadThemeCSS'
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: LayoutProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(true)

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedTheme = localStorage.getItem('theme') || 'monochrome'
  //     loadThemeCSS(storedTheme)
  //     setIsThemeLoaded(true)
  //   }
  // }, [])

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {isThemeLoaded ? children : null}
        </ThemeProvider>
      </body>
    </html>
  )
}
