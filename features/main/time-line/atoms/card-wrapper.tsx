import { PropsWithChildren } from 'react';

import { css } from '@/styled-system/css';

interface CardWrapperProps {
  isLast?: boolean;
}

export const CardWrapper = ({
  isLast = false,
  children,
}: PropsWithChildren<CardWrapperProps>) => {
  return (
    <div className={wrapperStyles}>
      {children}
      {!isLast && <div className={lineStyles} />}
    </div>
  );
};

const wrapperStyles = css({ position: 'relative' });

const lineStyles = css({
  position: 'absolute',
  bottom: '-50px',
  left: '6%',
  strokeWidth: '2px',
  width: '2px',
  height: '50px',
  backgroundColor: 'background.gray',
});
