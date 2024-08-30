/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const idToken = url.searchParams.get('id_token');

    if (code && idToken) {
      const user = url.searchParams.get('user');

      fetch('/api/apple/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          id_token: idToken,
          user: user ?? '',
        }).toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error('Login Error:', data.error);
          } else {
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('Fetch Error:', error);
        });
    }
  }, [router]);

  return (
    <>
      <LoginLoading />
      <LoginScreen isAnimate={false} />
    </>
  );
};

export default Page;
