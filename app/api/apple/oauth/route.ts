// /pages/api/apple/oauth.ts (서버 측 코드)
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';

import { setAuthCookies } from '@/apis/server-cookie';
import { LoginResponse } from '@/types/authType';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const formData = parse(body);

  const code = formData['code'];
  const idToken = formData['id_token'];
  const email = formData['email'];
  const name = formData['name'];
  const state = formData['state'];

  if (!code || !idToken) {
    return NextResponse.json(
      { error: 'code 또는 id_token이 누락되었습니다.' },
      { status: 400 },
    );
  }

  const bodyData = {
    code: code.toString(),
    idToken: idToken.toString(),
    email: email?.toString(),
    name: name?.toString(),
    state: state?.toString(),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/apple`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: '서버 요청 실패' },
      { status: res.status },
    );
  }

  const data = (await res.json()) as LoginResponse;
  setAuthCookies(data.data);

  // 클라이언트 페이지로 리디렉션
  const loginUrl = new URL('/apple/oauth', request.url);

  return NextResponse.redirect(loginUrl);
}
