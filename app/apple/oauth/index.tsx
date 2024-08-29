'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LoadingArea } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';
import { LoginResponse } from '@/types/authType';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const postFormData = async () => {
      try {
        const query = new URLSearchParams(window.location.search);
        const formData = new FormData();
        query.forEach((value, key) => {
          formData.append(key, value);
        });

        console.log(query);

        const response = await fetch('/api/apple/oauth', {
          method: 'POST',
          body: formData,
        });

        console.log(response);

        if (response.ok) {
          const data = (await response.json()) as LoginResponse;
          console.log('Success:', data);

          router.push('/join/nickname');
        } else {
          console.error('Failed to authenticate with Apple');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postFormData().catch((error) => {
      console.error('Error:', error);
    });
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
