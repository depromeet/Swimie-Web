import { css } from '@/styled-system/css';

import { NavigateBackArrow } from './navigate-back-arrow';
import { HeaderBarProps } from './type';

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
  padding: '8px 0px',
});

const arrowIconStyles = css.raw({
  position: 'absolute',
  top: '4px',
  left: '4px',
});
