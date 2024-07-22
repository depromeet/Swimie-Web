'use client';

import { useRouter } from 'next/navigation';

import { css, cx } from '@/styled-system/css';

import { LeftArrowIcon } from '../Icons/left-arrow-icon';
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
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '38px',
});

const backArrowStyles = css({
  position: 'absolute',
  marginLeft: '8px',
});
