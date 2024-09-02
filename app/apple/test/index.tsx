/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';
import { AuthInfoAtom } from '@/store/auth';
import { AuthResponse } from '@/types/authType';

const Page = () => {
  const router = useRouter();
  const setAuth = useSetAtom(AuthInfoAtom);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      const idToken = queryParams.get('id_token');
      const state = queryParams.get('state');
      const email = queryParams.get('email') || '';
      const name = queryParams.get('name') || '';

      if (code && idToken) {
        try {
          const response = await fetch('/api/apple/oauth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              idToken,
              state,
              email,
              name,
            }),
          });

          if (response.status === 200) {
            const data = (await response.json()) as AuthResponse;

            setAuth({
              isLogined: true,
              nickname: data.data.data.nickname,
              userId: data.data.data.userId,
            });

            if (data.data.data.isSignUpComplete) {
              router.push('/');
            } else {
              router.push('/join/nickname');
            }
          }
        } catch (error) {
          console.error('서버 요청 중 오류 발생:', error);
        }
      } else {
        console.error('인증 데이터가 누락되었습니다.');
      }
    };

    void handleAuthCallback();
  }, [router, setAuth]);

  return (
    <>
      <LoginLoading />
      <LoginScreen isAnimate={false} />
    </>
  );
};

export default Page;
