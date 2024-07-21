import { css, cx } from '@/styled-system/css';

import { NavigateBackArrow } from './navigate-back-arrow';
import { HeaderBarProps } from './type';

export function HeaderBar({
  className,
  children,
  backArrowClick,
}: HeaderBarProps) {
  return (
    <header className={cx(headerBarStyles, className)}>
      <NavigateBackArrow
        backArrowClick={backArrowClick}
        className={arrowIconStyles}
      />
      {children}
    </header>
  );
}

const headerBarStyles = css({
  position: 'relative',
  padding: '8px 0px',
});

const arrowIconStyles = css({
  position: 'absolute',
  top: '4px',
  left: '4px',
});
