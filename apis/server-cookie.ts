import { cookies } from 'next/headers';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

const isProduction = process.env.NODE_ENV === 'production';

// 쿠키 세팅
export function setAuthCookies(tokenData: TokenData): void {
  const cookieStore = cookies();

  // 엑세스 토큰
  cookieStore.set('accessToken', tokenData.accessToken, {
    maxAge: 3600, // 1시간
    httpOnly: true,
    secure: isProduction,
  });

  // 리프레시 토큰
  cookieStore.set('refreshToken', tokenData.refreshToken, {
    maxAge: 7 * 24 * 3600, // 7일
    httpOnly: true,
    secure: isProduction,
  });
}

// 쿠키 삭제
export function clearAuthCookies(): void {
  const cookieStore = cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
