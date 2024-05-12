import { i18nRouter } from "next-i18n-router";
import { NextResponse, NextRequest } from 'next/server';
import { isAuthenticated } from '@/utils/amplify-utils';
import i18nConfig from '@/i18nConfig';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Check if the user is authenticated
  const isAuth = await isAuthenticated();

  // If the user is not authenticated and the request is for the /notes route, redirect to the sign-in page
  if (!isAuth && pathname === '/notes') {
    return NextResponse.redirect(`${origin}/signin`);
  }

  // Handle i18n
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};