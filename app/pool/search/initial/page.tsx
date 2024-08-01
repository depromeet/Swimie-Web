'use client';
import { useEffect } from 'react';

import { getCookie } from '@/apis/client-cookie';

export default function Home() {
  useEffect(() => {
    const postCode = async () => {
      try {
        const accessToken = getCookie('accessToken');
        const data = await fetch(`/api/pool/search/initial`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('테스트 성공 시 response:', await data.json());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postCode().catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <main>
      <h1>Welcome to Next.js!</h1>
    </main>
  );
}
