import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';

import { setAuthCookies } from '@/apis/server-cookie';
import { LoginResponse } from '@/types/authType';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.text();
    const formData = parse(body);

    const code = formData['code'] as string;
    const idToken = formData['id_token'] as string;
    const state = formData['state'] as string;
    const email = formData['email'] as string;
    const name = formData['name'] as string;

    if (!code || !idToken) {
      return NextResponse.json(
        { error: 'code 또는 id_token이 누락되었습니다.' },
        { status: 400 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login/apple`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          idToken,
          state,
          email: email || undefined,
          name: name || undefined,
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: '서버 요청 실패' },
        { status: res.status },
      );
    }

    const data = (await res.json()) as LoginResponse;

    setAuthCookies(data.data);

    return NextResponse.json({ data }, { status: res.status });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
