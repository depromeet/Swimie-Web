import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginClient from './login-client';

export default function LoginPage() {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');

  // 로그인 시 메인 페이지로 리다이렉션
  if (accessToken && refreshToken) {
    redirect('/');
  }

  return <LoginClient />;
}
