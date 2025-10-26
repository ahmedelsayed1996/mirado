import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ar)/:path*']
};

// import { type Locale, locales } from "@/lib/locales";

// import createMiddleware from "next-intl/middleware";
// import { type NextRequest, type NextResponse } from "next/server";

// const nextIntlMiddleware = createMiddleware({
//   locales: ["ar", "en"],
//   defaultLocale: "ar",
//   // localePrefix: "never",
// });

// export default function (req: NextRequest): NextResponse {
//   return nextIntlMiddleware(req);
// }

// export const config = {
//   matcher: [
//     // "/((?!api|_next|_vercel|.*\\..*).*)",
//     '/', '/(ar|en)/:path*'
//   ],
// };
