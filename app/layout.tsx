'use client'

import { ReactNode, useEffect, useState } from 'react'
import { geistSans } from '@/utils/fonts'
import { ThemeProvider } from '@/context/ThemeProvider'
import loadThemeCSS from '@/utils/loadThemeCSS'
import './globals.css'

interface LayoutProps {
  children: ReactNode
}


export default function DefaultLayout({ children }: LayoutProps) {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') || 'monochrome'
      console.log('loading theme from layout', storedTheme)
      loadThemeCSS(storedTheme)
      setIsThemeLoaded(true)
    }
  }, [])

  return (
    <html lang="en">
      <body className={`m-0 bg-[--bg-color] text-[--text-color] overflow-x-hidden ${geistSans.className}`}>
        <ThemeProvider>
          {isThemeLoaded ? children : null}
        </ThemeProvider>
      </body>
    </html>
  )
}
