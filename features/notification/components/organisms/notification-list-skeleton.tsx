import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const SkeletonItem = () => {
  return (
    <div className={wrapperStyle}>
      <div className={profileStyle} />
      <div className={content.wrapperStyle}>
        <div className={content.innerStyle({ type: 'long' })} />
        <div className={content.innerStyle({ type: 'short' })} />
      </div>
    </div>
  );
};

export const NotificationListSkeleton = () => {
  return (
    <div className={containerStyle}>
      {new Array(9).fill(0).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '8px',
  width: '100%',
});

const wrapperStyle = flex({
  gap: '16px',
  align: 'center',
  width: '100%',
  p: '8px 20px 0px 20px',
});

const profileStyle = css({
  width: '40px',
  height: '40px',
  rounded: 'full',
  backgroundColor: 'fill.normal',
  animation: 'skeleton 1.5s infinite',
});

const content = {
  wrapperStyle: flex({
    direction: 'column',
    gap: '2px',
    flexGrow: 1,
  }),

  innerStyle: cva({
    base: {
      backgroundColor: 'fill.normal',
      animation: 'skeleton 1.5s infinite',
      rounded: '4px',
    },
    variants: {
      type: {
        short: {
          width: '50px',
          height: '18px',
        },
        long: {
          width: '220px',
          height: '22px',
        },
      },
    },
  }),
};
