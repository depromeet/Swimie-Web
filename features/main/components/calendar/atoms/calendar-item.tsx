import { useAtomValue } from 'jotai';
import Link from 'next/link';

import { useToast } from '@/hooks';
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
  const { toast } = useToast();

  if (isFetching) return <CalendarItemSkeletonBody />;

  const handleClickDisabledButton = () => {
    if (isDisableRecord)
      toast('기록을 남길 수 없는 공간이에요.', { type: 'warning' });
    else if (isFuture)
      toast('미래 날짜에는 기록할 수 없어요.', { type: 'warning' });
  };

  if (!memory)
    return (
      <>
        {isFuture || isDisableRecord ? (
          <button
            className={linkContainerStyles}
            onClick={handleClickDisabledButton}
          />
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
        {totalDistance && <p className={textStyles}>{totalDistance}</p>}
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

const textStyles = css({
  textStyle: 'caption2',
  fontWeight: 'medium',
  textAlign: 'center',
  color: 'text.placeHolder',
});
