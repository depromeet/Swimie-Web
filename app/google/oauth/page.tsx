'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const GOOGLE_CODE = searchParams.get('code');

    const postCode = async () => {
      if (!GOOGLE_CODE) {
        console.error('Google code is not available');
        return;
      }
      try {
        const response = await fetch(`/api/google/oauth?code=${GOOGLE_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: GOOGLE_CODE }),
        });

        if (response.status === 200) {
          console.log('Login successful:', await response.json());

          router.push('/');
        } else {
          console.error('Failed to set cookies:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postCode().catch((error) => {
      console.error('Error:', error);
    });
  }, [router, searchParams]);

  return <div>구글로 로그인중입니다.</div>;
};

export default Page;
