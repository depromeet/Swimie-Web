'use client';

import { useRouter } from 'next/navigation';

import { css } from '@/styled-system/css';

import { LeftArrow } from '../Icons';

interface NavigateBackArrowProps {
  styles?: object;
}

export function NavigateBackArrow({ styles }: NavigateBackArrowProps) {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };
  return (
    <div className={css(styles)} onClick={navigateBack}>
      <LeftArrow />
    </div>
  );
}
