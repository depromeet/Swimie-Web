import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginClient from './login-client';

export default function LoginPage() {
  const accessToken = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');

  if (accessToken && refreshToken) {
    redirect('/');
  }

  return <LoginClient />;
}
