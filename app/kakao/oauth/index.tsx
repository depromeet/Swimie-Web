'use client';

import { error } from 'console';
import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';
import { AuthInfoAtom } from '@/store/auth';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useSetAtom(AuthInfoAtom);

  useEffect(() => {
    const userId = searchParams.get('userId');
    const nickname = searchParams.get('nickname');
    const profileImageUrl = searchParams.get('profileImageUrl');
    const isSignUpComplete = searchParams.get('isSignUpComplete');

    if (userId && nickname && profileImageUrl && isSignUpComplete !== null) {
      setAuth({
        isLogined: true,
        nickname,
        userId: Number(userId),
      });

      if (isSignUpComplete) {
        router.push('/');
      } else {
        router.push('/join/nickname');
      }
    } else {
      console.error(error);
    }
  }, [router, searchParams, setAuth]);

  return (
    <>
      <LoginLoading />
      <LoginScreen isAnimate={false} />
    </>
  );
};

export default Page;
