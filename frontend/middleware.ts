// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 認証不要なパス
  const publicPaths = ['/login', '/register', '/api']
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Strapiのトークンを確認
  const strapiToken = request.cookies.get('strapi_jwt')

  // 未認証で保護されたページへのアクセス
  if (!strapiToken && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 認証済みユーザーのログインページアクセスを防止
  if (strapiToken && isPublicPath && request.nextUrl.pathname !== '/api') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}