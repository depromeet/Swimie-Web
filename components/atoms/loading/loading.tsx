import { css } from '@/styled-system/css';

import { LoadingIcon } from '../icons';

interface LoadingScale {
  width: number;
  height: number;
}

export const LoadingArea = ({ width, height }: LoadingScale) => {
  return (
    <div className={containerStyle}>
      <div className={wrapperStyle}>
        <LoadingIcon width={width} height={height} />
      </div>
    </div>
  );
};

const containerStyle = css({
  width: 'full',
  py: '40px',
});

const wrapperStyle = css({
  width: 'fit-content',
  height: 'fit-content',
  margin: '0 auto',
  animation: 'spin 1s linear infinite',
});
