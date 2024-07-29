'use client';

import { useEffect } from 'react';

import { TextField } from '@/components/molecules/text-field';
import { css } from '@/styled-system/css';

const styles = css({
  w: 'full',
  h: 'full',
  fontSize: '40px',
  fontWeight: '600',
  color: 'green.50',
});

export default function Home() {
  useEffect(() => {
    const getPool = async () => {
      try {
        const response = await fetch(`/api/pool/search`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log(response.json());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getPool().catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <main className={styles}>
      <TextField unit="m" />
      2팀 웹 파이팅~~
    </main>
  );
}
