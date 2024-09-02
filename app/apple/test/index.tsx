/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';
import { AuthInfoAtom } from '@/store/auth';
import { LoginResponse } from '@/types/authType';

const Page = () => {
  const router = useRouter();
  const setAuth = useSetAtom(AuthInfoAtom);

  useEffect(() => {
    const url = new URL(window.location.href);
    const data = url.searchParams.get('data') as string;
    const decodedData = decodeURIComponent(data);
    const jsonData = JSON.parse(decodedData) as LoginResponse;

    setAuth({
      isLogined: true,
      nickname: jsonData.data.nickname,
      userId: jsonData.data.userId,
    });

    if (jsonData.data.isSignUpComplete) {
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
