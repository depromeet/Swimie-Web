import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';

import { setAuthCookies, TokenData } from '@/apis/server-cookie';
import { LoginResponse } from '@/apis/type';

export const dynamic = 'force-dynamic';
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/login/google`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    },
  );

  if (!res.ok) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: res.status },
    );
  }

  // 타입을 명시적으로 지정
  const data = (await res.json()) as LoginResponse;

  const tokenData: TokenData = {
    accessToken: data.data.accessToken.replace('Bearer ', ''),
    refreshToken: data.data.refreshToken.replace('Bearer ', ''),
  };

  // 쿠키 설정
  setAuthCookies(tokenData);

  return NextResponse.json({ data }, { status: res.status });
}
