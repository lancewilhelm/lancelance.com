import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Get the theme from cookies, fallback to "monochrome"
  const theme = req.cookies.get('theme')?.value || 'monochrome'

  // Clone the response so we can modify headers
  const res = NextResponse.next()
  res.headers.set('x-theme', theme)

  return res
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
}

