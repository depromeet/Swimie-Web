'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { LeftArrowIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

export interface HeaderBarProps {
  className?: string;
  arrowClassName?: string;
  onClickBackArrow?: () => void;
  children?: ReactNode;
}

/**
 *
 * @param className header-bar에 외부 스타일 주입
 * @param arrowClassName left-arrow-icon에 외부 스타일 주입
 * @param children children 요소
 * @param backArrowClick 외부에서 뒤로가기 클릭 시 수행할 동작을 직접 선언(default: router.back())
 */
export function HeaderBar({
  className,
  arrowClassName,
  children,
  onClickBackArrow,
}: HeaderBarProps) {
  const router = useRouter();

  const handleBackClick = () => {
    onClickBackArrow ? onClickBackArrow() : router.back();
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
