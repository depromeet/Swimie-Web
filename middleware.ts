import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { NewTokenData } from './apis/refresh-token';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const loginPageRegex = /^\/login$/;
  const isLoginPage = loginPageRegex.test(request.nextUrl.pathname);

  // NOTE: refreshToken이 없으면 로그인 페이지로 리다이렉트
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // NOTE: accessToken이 없으면 재발급 시도
  if (!accessToken) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: refreshToken,
        },
      },
    );

    if (refreshResponse.ok) {
      const data = (await refreshResponse.json()) as NewTokenData;
      accessToken = `Bearer ${data.data.accessToken}`;

      const response = NextResponse.next();
      response.cookies.set('accessToken', accessToken, {
        maxAge: 3600, // 1시간
        httpOnly: true,
        secure: true,
      });

      response.headers.set('Authorization', accessToken);

      // NOTE: 로그인 페이지일 경우, '/' 경로로 리다이렉트
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return response;
    } else {
      // NOTE: 리프레시 토큰이 유효하지 않은 경우 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|login|kakao/oauth|google/oauth).*)',
  ],
};
