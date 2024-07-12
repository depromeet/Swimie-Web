import { ReactNode } from 'react';

import { NavigateBackArrow } from '@/components/atoms';
import { css } from '@/styled-system/css';

interface HeaderBarProps {
  styles?: object;
  children: ReactNode;
}

export function HeaderBar({ styles, children }: HeaderBarProps) {
  return (
    <header className={css(headerBarStyles, styles)}>
      <NavigateBackArrow styles={arrowIconStyles} />
      {children}
    </header>
  );
}

const headerBarStyles = css.raw({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '9px',
});

const arrowIconStyles = css.raw({
  position: 'absolute',
  left: '16px',
});
