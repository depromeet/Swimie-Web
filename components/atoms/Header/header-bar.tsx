import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

import { NavigateBackArrow } from './navigate-back-arrow';

interface HeaderBarProps {
  styles?: object;
  children?: ReactNode;
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
});

const arrowIconStyles = css.raw({
  position: 'absolute',
  left: '3px',
});
