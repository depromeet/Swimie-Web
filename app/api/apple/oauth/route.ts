import { NextRequest, NextResponse } from 'next/server';

import { LoginResponse } from '@/types/authType';

export interface AppleLoginUser {
  name?: {
    firstName: string;
    lastName: string;
  };
  email?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();

    // NOTE: userData는 옵셔널 값
    const userData = formData.get('user') as string | null;
    const code = formData.get('code');
    const idToken = formData.get('id_token');

    if (!code || !idToken) {
      return NextResponse.json(
        { error: 'code 또는 id_token이 누락되었습니다.' },
        { status: 400 },
      );
    }

    let user: AppleLoginUser | undefined;

    if (userData) {
      user = JSON.parse(userData) as AppleLoginUser;
    }

    const bodyData: {
      user?: AppleLoginUser;
      code: FormDataEntryValue;
      id_token: FormDataEntryValue;
    } = {
      code,
      id_token: idToken,
    };

    if (user) {
      bodyData.user = user;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login/apple`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: `${process.env.NEXT_PUBLIC_LOGIN_URL}`,
        },
        body: JSON.stringify(bodyData),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: '서버 요청 실패' },
        { status: res.status },
      );
    }

    const data = (await res.json()) as LoginResponse;

    return NextResponse.json({ data }, { status: res.status });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
