import { error } from 'console';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { LoginResponse } from '@/apis/type';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login/kakao`,
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: LoginResponse = await res.json();
  console.log('accessToken:', data.data.accessToken);
  console.log('refreshToken:', data.data.refreshToken);

  // 쿠키 설정
  const cookieStore = cookies();
  cookieStore.set('accessToken', data.data.accessToken);
  cookieStore.set('refreshToken', data.data.refreshToken);

  return NextResponse.json({ data });
}
