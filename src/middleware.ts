import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Protected and public routes
const protectedRoutes = ['/admin', '/report']
const publicRoutes = ['/login', '/logout']

// simple security middleware
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path === route)

  // Get auth cookie
  const authCookie = req.cookies.get('auth')?.value
  const isAuthenticated = !!authCookie

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // already authenticated and trying to access login back to dash
  if (path === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/report/sales', req.nextUrl))
  }

  return NextResponse.next()
}

// Configure which routes middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|data|favicon.ico|.*\\.png$).*)'],
}