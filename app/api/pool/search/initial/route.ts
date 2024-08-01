import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { fetchNewAccessToken } from '@/apis/refresh-token';
import { clearAuthCookies } from '@/apis/server-cookie';

export interface SearchPool {
  status: number;
  code: string;
  message: string;
  data: {
    favoritePools: [];
    searchedPools: [];
  };
}

export async function GET(): Promise<NextResponse> {
  let accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  try {
    if (!accessToken && refreshToken) {
      accessToken = await fetchNewAccessToken(refreshToken);

      if (!accessToken) {
        clearAuthCookies();
        return NextResponse.json(
          {
            error:
              'refreshToken이 유효하지 않아 accessToken을 발급하지 못했습니다.',
          },
          { status: 401 },
        );
      }

      cookies().set('accessToken', `${accessToken}`);
    }

    if (accessToken) {
      const endpoint = '/pool/search/initial';
      const method = 'GET';
      const body = '';

      const data = (await fetchData(
        endpoint,
        method,
        accessToken,
        body,
      )) as SearchPool;
      return NextResponse.json({ data });
    }

    return NextResponse.json(
      { error: 'aceessToken이 유효하지 않습니다.' },
      { status: 401 },
    );
  } catch (error) {
    clearAuthCookies();
    return NextResponse.json(
      { error: '데이터를 받아오지 못했습니다.' },
      { status: 500 },
    );
  }
}
