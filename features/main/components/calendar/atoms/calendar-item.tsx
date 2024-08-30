import { useAtomValue } from 'jotai';
import Link from 'next/link';

import { calendarDateAtom } from '@/store';
import { css } from '@/styled-system/css';

import { Memory } from '../../../types/calendar';
import { ItemContent } from './calendar-item-content';
import { CalendarItemSkeletonBody } from './calendar-item-skeleton';

interface CalendarItemProps {
  date: number;
  memory: Memory | undefined;
  totalDistance?: number;
  isFuture: boolean;
  isDisableRecord: boolean;
  isFetching: boolean;
}

export const CalendarItem = ({
  date,
  isFuture,
  memory,
  isDisableRecord,
  isFetching,
}: CalendarItemProps) => {
  const { year, month } = useAtomValue(calendarDateAtom);
  const targetDate = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;

  if (isFetching) return <CalendarItemSkeletonBody />;

  if (!memory)
    return (
      <>
        {isFuture || isDisableRecord ? (
          <div className={linkContainerStyles} />
        ) : (
          <Link
            href={`/record?date=${targetDate}`}
            className={linkContainerStyles}
          />
        )}
        <div className={totalDistanceAreaStyles} />
      </>
    );

  const { memoryId, type, totalDistance, strokes, isAchieved, imageUrl } =
    memory;

  return (
    <>
      <Link href={`/record-detail/${memoryId}`} className={linkContainerStyles}>
        {
          <ItemContent
            type={type}
            totalDistance={totalDistance}
            strokes={strokes}
            isAchieved={isAchieved}
            imageUrl={imageUrl}
          />
        }
      </Link>
      <div className={totalDistanceAreaStyles}>
        {totalDistance && <p>{totalDistance}</p>}
      </div>
    </>
  );
};

export const totalDistanceAreaStyles = css({ height: '18px' });

export const linkContainerStyles = css({
  width: 'full',
  aspectRatio: 'auto 3 / 4',
  maxHeight: '120px',
  backgroundColor: 'background.gray',
  rounded: '2px',
});
