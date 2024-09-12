import { PropsWithChildren } from 'react';

import { css, cva } from '@/styled-system/css';

interface CardWrapperProps {
  hasDivider?: boolean;
}

export const CardWrapper = ({
  hasDivider = false,
  children,
}: PropsWithChildren<CardWrapperProps>) => {
  return (
    <li className={wrapperStyles({ hasDivider })}>
      {children}
      {!hasDivider && <div className={lineStyles} />}
    </li>
  );
};

const wrapperStyles = cva({
  base: { position: 'relative' },
  variants: { hasDivider: { false: { mb: '50px' }, true: { mb: '15px' } } },
});

const lineStyles = css({
  position: 'absolute',
  bottom: '-50px',
  left: '6%',
  strokeWidth: '2px',
  width: '2px',
  height: '50px',
  backgroundColor: 'background.gray',
});
