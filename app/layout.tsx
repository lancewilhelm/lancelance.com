import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import { geistSans } from '@/utils/fonts'
import { ThemeProvider } from '@/context/ThemeProvider'
import { generateFaviconSVG } from '@/utils/favicon'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export default async function DefaultLayout({ children }: LayoutProps) {
  const theme = (await cookies()).get('theme')?.value || 'monochrome'
  const themeHref = `/css/themes/${theme}.css`
  const faviconHref = generateFaviconSVG(theme) // Generate favicon on the server

  return (
    <html lang="en">
      <head>
        {/* <script */}
        {/*   crossOrigin="anonymous" */}
        {/*   src="//unpkg.com/react-scan/dist/auto.global.js" */}
        {/* /> */}
        <link id='currentTheme' rel='stylesheet' type='text/css' href={themeHref} />
        {/* Inject dynamically generated favicon */}
        <link id="favicon" rel="icon" type="image/svg+xml" href={faviconHref} />
      </head>
      <body className={`m-0 bg-[--bg-color] text-[--text-color] overflow-x-hidden ${geistSans.className}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
