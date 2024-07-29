// app/kakao/oauth/page.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getCookie } from '@/apis/cookie';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const KAKAO_CODE = searchParams.get('code');

    const postCode = async () => {
      if (!KAKAO_CODE) {
        console.error('Kakao code is not available');
        return;
      }
      try {
        const response = await fetch(`/api/kakao/oauth?code=${KAKAO_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: KAKAO_CODE }),
        });

        if (response.status === 200) {
          console.log('Login successful:', await response.json());
          console.log(getCookie('accessToken'));
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

  return <div>카카오톡으로 로그인중입니다.</div>;
};

export default Page;
