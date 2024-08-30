import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export const CalendarHeaderSkeleton = () => {
  return (
    <div className={skeletonConatinerStyles}>
      <div className={cx(skeletonStyles, moveCalendarSkeletonStyles)} />
      <div className={cx(skeletonStyles, buttonSkeletonStyles)} />
    </div>
  );
};

const skeletonConatinerStyles = flex({
  width: 'full',
  height: '32px',
  justifyContent: 'space-between',
});

const skeletonStyles = css({
  backgroundColor: 'fill.normal',
  animation: 'skeleton 1.5s infinite',
  rounded: '2px',
});

const moveCalendarSkeletonStyles = css({ width: '156px', height: 'full' });

const buttonSkeletonStyles = css({ width: '72px', height: 'full' });
