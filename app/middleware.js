import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip if it's a file request
  const pathname = request.nextUrl.pathname;
  if (pathname.includes('.') && !pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon|robots|sitemap|manifest|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js|json)).*)',
  ],
}