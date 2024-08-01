/**
 * fetchData로 요청 시 코드 중복 및 휴먼 에러를 최소화 합니다.
 * @param endpoint 요청할 엔드포인트를 전달합니다.
 * @param method 요청의 method를 지정합니다.
 * @param body method에 따라 body가 필요할 경우 지정합니다.
 * @returns 요청에 대한 응답을 받습니다.
 */

import { cookies } from 'next/headers';

export async function fetchData(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: '',
) {
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

  if (!response.ok) {
    console.error('요청을 다시 확인해주세요.', response.statusText);
  }

  return response.json();
}
