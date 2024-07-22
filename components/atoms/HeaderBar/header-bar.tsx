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
      <div className={parentStyles}>
        <div
          className={cx(arrowIconStyles, arrowClassName)}
          onClick={handleBackClick}
        >
          <LeftArrowIcon />
        </div>
        {children}
      </div>
    </header>
  );
}

const headerBarStyles = css({
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  minHeight: '38px',
});

const parentStyles = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '0 10px',
});

const arrowIconStyles = css({
  position: 'absolute',
  left: 0,
});
