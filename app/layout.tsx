import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import { geistSans } from '@/utils/fonts'
import { generateFaviconSVG } from '@/utils/favicon'
import { Analytics } from "@vercel/analytics/react"
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export default async function DefaultLayout({ children }: LayoutProps) {
  const theme = (await cookies()).get('theme')?.value
  let themeHref, faviconHref
  if (theme) {
    themeHref = `/css/themes/${theme}.css`
    faviconHref = generateFaviconSVG(theme) // Generate favicon on the server
  }

  return (
    <html lang="en">
      <head>
        {theme && <link id='currentTheme' rel='stylesheet' type='text/css' href={themeHref} />}
        {theme && <link id="favicon" rel="icon" type="image/svg+xml" href={faviconHref} />}
      </head>
      <body className={`m-0 bg-[--bg-color] text-[--text-color] overflow-x-hidden text-[14pt] ${geistSans.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
