'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoadingArea } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const idToken = url.searchParams.get('id_token');

    if (code) {
      console.log('Authorization Code:', code);
    }

    if (idToken) {
      console.log('ID Token:', idToken);
    }
  }, [router]);

  return (
    <div className={LoadingWrapper}>
      <LoadingArea width={100} height={100} />
      <div>Apple로 로그인중입니다.</div>
    </div>
  );
};

const LoadingWrapper = flex({
  direction: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  height: '100vh',
  textAlign: 'center',
  fontWeight: 'bold',
});

export default Page;
