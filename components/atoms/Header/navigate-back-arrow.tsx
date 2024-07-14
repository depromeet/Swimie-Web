'use client';

import { useRouter } from 'next/navigation';

import { css } from '@/styled-system/css';

import { LeftArrowIcon } from '../Icons';

interface NavigateBackArrowProps {
  addStyles?: object;
}

export function NavigateBackArrow({ addStyles }: NavigateBackArrowProps) {
  const router = useRouter();

  const handleNavigateBackClick = () => {
    router.back();
  };
  return (
    <div className={css(addStyles)} onClick={handleNavigateBackClick}>
      <LeftArrowIcon />
    </div>
  );
}
