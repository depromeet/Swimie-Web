import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { NewTokenData } from './apis/refresh-token';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  let accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  const loginPageRegex = /^\/login$/;
  const isLoginPage = loginPageRegex.test(request.nextUrl.pathname);

  // NOTE: token 없으므로 login page로 리다이렉트
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // TODO: accessToken 재발급
  if (refreshToken && !accessToken) {
    const responseData = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: refreshToken,
        },
      },
    );

    const data = (await responseData.json()) as NewTokenData;
    accessToken = data.data.accessToken;

    const response = NextResponse.next();
    response.cookies.set('accessToken', `Bearer ${accessToken}`, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
    });

    // TODO: refresh 사용하여 access 토큰 발급 + 헤더에 세팅
    if (isLoginPage) {
      // TODO: 로그인 페이지일 경우, '/'경로로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
    // TODO: 로그인 페이지가 아닌 경우, 토큰 발급만 진행
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|login|kakao/oauth|google/oauth).*)',
  ],
};
