import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

import { NavigateBackArrow } from './navigate-back-arrow';

interface HeaderBarProps {
  addStyles?: object;
  children?: ReactNode;
}

export function HeaderBar({ addStyles, children }: HeaderBarProps) {
  return (
    <header className={css(headerBarStyles, addStyles)}>
      <NavigateBackArrow addStyles={arrowIconStyles} />
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
