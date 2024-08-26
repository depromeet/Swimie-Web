import { css, cva } from '@/styled-system/css';

import { LoadingIcon } from '../icons';

interface LoadingScale {
  width?: number;
  height?: number;
  paddingY?: 'none' | 'small' | 'normal';
}

export const LoadingArea = ({
  width = 20,
  height = 20,
  paddingY = 'normal',
}: LoadingScale) => {
  return (
    <div className={containerStyle({ paddingY })}>
      <div className={wrapperStyle}>
        <LoadingIcon width={width} height={height} />
      </div>
    </div>
  );
};

const containerStyle = cva({
  base: {
    width: 'full',
  },
  variants: {
    paddingY: {
      none: { py: '0' },
      small: { py: '20px' },
      normal: { py: '40px' },
    },
  },
});

const wrapperStyle = css({
  width: 'fit-content',
  height: 'fit-content',
  margin: '0 auto',
  animation: 'spin 1s linear infinite',
});
