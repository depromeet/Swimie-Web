/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';

import { setAuthCookies } from '@/apis/server-cookie';
import { LoginResponse } from '@/types/authType';

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 요청 본문 파싱
  const body = await request.text();
  const formData = parse(body);

  // 필수 데이터 추출
  const code = formData['code'];
  const idToken = formData['id_token'];
  const email = formData['email'];
  const name = formData['name'];

  // 필수 필드 확인
  if (!code || !idToken) {
    return NextResponse.json(
      { error: 'code 또는 id_token이 누락되었습니다.' },
      { status: 400 },
    );
  }

  // 서버에 로그인 요청
  const bodyData = {
    code: code.toString(),
    idToken: idToken.toString(),
    email: email?.toString(),
    name: name?.toString(),
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

  // 로그인 응답 처리
  const data = (await res.json()) as LoginResponse;
  setAuthCookies(data.data); // 쿠키 설정

  return NextResponse.json({ data }, { status: res.status });
}
