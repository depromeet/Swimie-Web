'use client';

import { useRouter } from 'next/navigation';

import { css, cx } from '@/styled-system/css';

import { LeftArrowIcon } from '../Icons';
import { HeaderBarProps } from './type';

export function HeaderBar({
  className,
  arrowClassName,
  children,
  backArrowClick,
}: HeaderBarProps) {
  const router = useRouter();

  const handleBackClick = () => {
    backArrowClick ? backArrowClick() : router.back();
  };
  return (
    <header className={cx(headerBarStyles, className)}>
      <div
        className={cx(backArrowStyles, arrowClassName)}
        onClick={handleBackClick}
      >
        <LeftArrowIcon />
      </div>
      {children}
    </header>
  );
}

const headerBarStyles = css({
  position: 'relative',
  padding: '9px 10px',
});

const backArrowStyles = css({
  position: 'absolute',
  top: '3px',
  left: '8px',
});
