import { cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const SkeletonItem = () => {
  return (
    <div className={content.wrapperStyle}>
      <div className={content.innerStyle({ type: 'short' })} />
      <div className={content.innerStyle({ type: 'long' })} />
    </div>
  );
};

export const TimeLineSkeleton = () => {
  return (
    <div className={containerStyle}>
      {new Array(4).fill(0).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '50px',
  width: '100%',
});

const content = {
  wrapperStyle: flex({
    direction: 'column',
    gap: '10px',
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
          width: '44px',
          height: '20px',
        },
        long: {
          width: '100%',
          height: '100px',
        },
      },
    },
  }),
};
