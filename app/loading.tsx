'use client';

import { LoadingWave } from '@/components/atoms';
import { flex } from '@/styled-system/patterns';

export default function Loading() {
  return (
    <div className={containerStyle}>
      <LoadingWave />
    </div>
  );
}

const containerStyle = flex({
  height: '100dvh',
  justify: 'center',
  align: 'center',
});
