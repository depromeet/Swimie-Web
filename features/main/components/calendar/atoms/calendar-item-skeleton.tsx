import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { linkContainerStyles, totalDistanceAreaStyles } from './calendar-item';

export const CalendarItemSkeleton = () => {
  return (
    <div className={skeletonItemStyles}>
      <CalendarItemSkeletonLayout />
      <CalendarItemSkeletonBody />
    </div>
  );
};

export const CalendarItemSkeletonLayout = () => {
  return <div className={skeletonLayoutStyles} />;
};

export const CalendarItemSkeletonBody = () => {
  return (
    <>
      <div className={cx(linkContainerStyles, animationStyle)} />
      <div className={totalDistanceAreaStyles} />
    </>
  );
};

const animationStyle = css({
  animation: 'skeleton 1.5s infinite',
});

const skeletonItemStyles = flex({ direction: 'column', gap: '2px' });

const skeletonLayoutStyles = css({
  pb: '2px',
  width: 'full',
  height: '18px',
  backgroundColor: 'fill.normal',
  animation: 'skeleton 1.5s infinite',
});
