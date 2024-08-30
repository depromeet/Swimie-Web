'use  client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import {
  useCalendarData,
  useCalendarRendaringData,
} from '@/features/main/hooks';
import { useCurrentMemberInfo } from '@/hooks';
import { calendarSwimCountAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import {
  CalendarHeaderSkeleton,
  CalendarItem,
  CalendarItemSkeleton,
  DayLabels,
} from '../atoms';
import { CalendarItemLayout } from '../atoms/calendar-item-layout';
import { CalendarHeader } from './calendar-header';

interface CalendarProps {
  targetId?: number;
}

export const Calendar = ({ targetId }: CalendarProps) => {
  const setSwimCount = useSetAtom(calendarSwimCountAtom);
  const { data: calendarData, isFetching } = useCalendarData(targetId);
  const { data: currentMemberData } = useCurrentMemberInfo();
  const [squares, startPoint, endPoint, isDateToday, isDateFuture] =
    useCalendarRendaringData();
  let memoryIndex = 0;

  const memberInfo = currentMemberData?.data;
  const memories = calendarData?.data.memories;

  useEffect(() => {
    if (!memories) return;
    setSwimCount(memories.length);
  }, [memories, setSwimCount]);

  const isLoading = !memories || !memberInfo;

  return (
    <div className={calendarContainerStyles}>
      {isLoading ? <CalendarHeaderSkeleton /> : <CalendarHeader />}
      <DayLabels />
      <ul className={CalendarGridStyles}>
        {squares.map((squareNumber, index) => {
          if (isLoading) return <CalendarItemSkeleton key={squareNumber} />;

          const isInRenderingRange = index >= startPoint && index <= endPoint;
          const date = squareNumber - startPoint;
          const isValidMemory =
            memoryIndex < memories.length &&
            memories[memoryIndex].memoryDate === date;
          const currentMemory = isValidMemory
            ? memories[memoryIndex++]
            : undefined;

          return isInRenderingRange ? (
            <CalendarItemLayout
              key={squareNumber}
              date={date}
              isToday={isDateToday(date)}
            >
              <CalendarItem
                date={date}
                isFuture={isDateFuture(date)}
                memory={currentMemory}
                isDisableRecord={!!(targetId && memberInfo.id !== targetId)}
                isFetching={isFetching}
              />
            </CalendarItemLayout>
          ) : (
            <div key={`out-of-range-${index}`} />
          );
        })}
      </ul>
    </div>
  );
};

const calendarContainerStyles = flex({
  width: 'full',
  height: '100%',
  flexDir: 'column',
  gap: '16px',
});

const CalendarGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridRowGap: '10px',
  gridColumnGap: '3px',
  color: 'text.alternative',
});
