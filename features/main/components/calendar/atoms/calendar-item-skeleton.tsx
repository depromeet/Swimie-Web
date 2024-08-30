import { css, cx } from '@/styled-system/css';

import { linkContainerStyles, totalDistanceAreaStyles } from './calendar-item';

export const CalendarItemSkeleton = () => {
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
