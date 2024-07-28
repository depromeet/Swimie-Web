'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setCookie } from '@/apis/cookie';
import { LoginResponse } from '@/apis/type';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const GOOGLE_CODE = new URL(window.location.href).searchParams.get('code');

    const postCode = async () => {
      if (!GOOGLE_CODE) {
        console.error('google code is not available');
        return;
      }

      try {
        const response = await axios.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login/google`,
          { code: GOOGLE_CODE },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const data = response.data;
        setCookie('accessToken', data.data.accessToken, { path: '/' });
        localStorage.setItem('refresh Token', data.data.refreshToken);
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postCode().catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return <div>구글로 로그인중입니다.</div>;
};

export default Page;
