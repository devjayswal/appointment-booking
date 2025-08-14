// middleware.js at project root
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const rateLimitMap = new Map();

export async function middleware(req) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(ts => now - ts < 60000);

  // Rate limiting for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    if (recent.length >= 20) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    recent.push(now);
    rateLimitMap.set(ip, recent);
  }

  // Admin page protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'] // Apply to APIs + admin pages
};
