import { URL } from 'url';

let locales = ["id", "en"];

interface RequestType {
  url: string | URL | undefined;
  nextUrl: {
    pathname: string;
    // Add other properties here if needed
  };
  // Add other properties here if needed
}

export function middleware(request: RequestType) {
  const { pathname } = request.nextUrl;
  
  // Skip static files and Next.js internal paths
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/assets') || 
    pathname.match(/^\/[^\/]+\.[^\/]+$/)
  ) {
    return; // Do nothing for static file requests
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = "id";
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  return Response.redirect(new globalThis.URL(request.nextUrl.pathname, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    "/((?!_next|assets).*)",
    // Only run on root (/) URL
    "/",
  ],
};
