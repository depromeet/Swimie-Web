import { css, cx } from '@/styled-system/css';

import { BackArrow } from './back-arrow';
import { HeaderBarProps } from './type';

export function HeaderBar({
  className,
  arrowClassName,
  children,
  backArrowClick,
}: HeaderBarProps) {
  return (
    <header className={cx(headerBarStyles, className)}>
      <BackArrow
        backArrowClick={backArrowClick}
        className={cx(backArrowStyles, arrowClassName)}
      />
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
