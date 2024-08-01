import { cookies } from 'next/headers';

export interface NewTokenData {
  status: number;
  code: string;
  message: string;
  data: {
    userId: number;
    accessToken: string;
  };
}

/**
 *
 * @param refreshToken 인가의 목적으로 쿠키에 저장된 refreshToken을 전달합니다.
 * @returns 새로운 accessToken을 발급받아 maxAge 1시간으로 설정합니다.
 */

export async function fetchNewAccessToken(
  refreshToken: string,
): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/login/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: refreshToken,
      },
    },
  );

  if (!response.ok) {
    console.error(
      '만료되거나 비정상적인 refreshToken입니다.',
      response.statusText,
    );
    return '';
  }

  const data = (await response.json()) as NewTokenData;
  const newAccessToken = `Bearer ${data.data.accessToken}`;
  cookies().set('accessToken', newAccessToken, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  });

  return newAccessToken;
}
