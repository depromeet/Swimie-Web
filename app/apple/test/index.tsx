/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';
import { AuthInfoAtom } from '@/store/auth';

const Page = () => {
  const router = useRouter();
  const setAuth = useSetAtom(AuthInfoAtom);

  useEffect(() => {
    const url = new URL(window.location.href);
    const userId = Number(url.searchParams.get('userId'));
    const nickname = url.searchParams.get('nickname') as string;
    const isSignUpComplete = Boolean(url.searchParams.get('isSignUpComplete'));

    setAuth({
      isLogined: true,
      nickname: nickname,
      userId: userId,
    });

    if (isSignUpComplete) {
      router.push('/');
    } else {
      router.push('/join/nickname');
    }
  }, [router, setAuth]);

  return (
    <>
      <LoginLoading />
      <LoginScreen isAnimate={false} />
    </>
  );
};

export default Page;
