/**
 * fetchData로 요청 시 코드 중복 및 휴먼 에러를 최소화 합니다.
 * @param endpoint 요청할 엔드포인트를 전달합니다.
 * @param method 요청의 method를 지정합니다.
 * @param body method에 따라 body가 필요할 경우 지정합니다.
 * @returns 요청에 대한 응답을 받습니다.
 */

import { cookies } from 'next/headers';

import { NewTokenData } from './refresh-token';

export async function fetchData<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: object,
): Promise<T> {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = cookies().get('accessToken')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `${accessToken}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 || response.status === 404) {
    const cookieStore = cookies();
    const refreshToken = cookies().get('refreshToken')?.value;

    if (refreshToken) {
      const refreshResponse = await fetch(`${BASE_URL}/login/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: refreshToken,
        },
      });

      if (refreshResponse.ok) {
        const data = (await refreshResponse.json()) as NewTokenData;
        const newAccessToken = `Bearer ${data.data.accessToken}`;

        cookieStore.set('accessToken', newAccessToken, {
          maxAge: 3600, // 1시간
          httpOnly: true,
          secure: true,
        });

        // 재시도: 새로운 토큰으로 요청
        return fetchData<T>(endpoint, method, body);
      }
    }
  }

  return response.json() as Promise<T>;
}
