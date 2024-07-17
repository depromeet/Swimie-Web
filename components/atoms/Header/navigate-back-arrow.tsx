'use client';

import { useRouter } from 'next/navigation';

import { css } from '@/styled-system/css';

import { LeftArrowIcon } from '../Icons';

interface NavigateBackArrowProps {
  addStyles?: object;
  backArrowClick?: () => void;
}

export function NavigateBackArrow({
  addStyles,
  backArrowClick,
}: NavigateBackArrowProps) {
  const router = useRouter();

  const handleNavigateBackClick = () => {
    backArrowClick ? backArrowClick() : router.back();
  };
  return (
    <div className={css(addStyles)} onClick={handleNavigateBackClick}>
      <LeftArrowIcon />
    </div>
  );
}
