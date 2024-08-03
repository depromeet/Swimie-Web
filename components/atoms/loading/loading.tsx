import { css } from '@/styled-system/css';

import { LoadingIcon } from '../icons';

export const LoadingArea = () => {
  return (
    <div className={containerStyle}>
      <div className={wrapperStyle}>
        <LoadingIcon width={20} height={20} />
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
