import dynamic from 'next/dynamic';

import { css, cva } from '@/styled-system/css';

interface LoadingScale {
  width?: number;
  height?: number;
  paddingY?: 'none' | 'small' | 'normal';
}

const DynamicLoadingSpinner = dynamic(
  () =>
    import('./loading-spinner').then(({ LoadingSpinner }) => LoadingSpinner),
  {
    ssr: false,
  },
);

export const LoadingArea = ({
  width = 30,
  height = 30,
  paddingY = 'normal',
}: LoadingScale) => {
  return (
    <div className={containerStyle({ paddingY })}>
      <div className={wrapperStyle}>
        <DynamicLoadingSpinner width={width} height={height} />
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
});
