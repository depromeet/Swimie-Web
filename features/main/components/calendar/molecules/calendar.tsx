'use  client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { LoadingArea } from '@/components/atoms';
import {
  useCalendarData,
  useCalendarRendaringData,
} from '@/features/main/hooks';
import { calendarSwimCountAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CalendarItem, DayLabels } from '../atoms';
import { CalendarHeader } from './calendar-header';

export const Calendar = ({ targetId }: { targetId?: number }) => {
  const setSwimCount = useSetAtom(calendarSwimCountAtom);
  const { data, isFetching } = useCalendarData(targetId);
  const [squares, startPoint, endPoint, isDateToday] =
    useCalendarRendaringData();
  let memoryIndex = 0;

  const memories = data?.data.memories;

  useEffect(() => {
    if (!memories) return;
    setSwimCount(memories.length);
  }, [memories, setSwimCount]);

  if (!memories) return null;

  return (
    <div className={calendarContainerStyles}>
      <CalendarHeader />
      <DayLabels />
      {isFetching ? (
        <LoadingArea />
      ) : (
        <ul className={CalendarGridStyles}>
          {squares.map((squareNumber, index) => {
            const isInRenderingRange = index >= startPoint && index <= endPoint;
            const date = squareNumber - startPoint;
            const isValidMemory =
              memoryIndex < memories.length &&
              memories[memoryIndex].memoryDate === date;
            const currentMemory = isValidMemory
              ? memories[memoryIndex++]
              : undefined;

            return isInRenderingRange ? (
              <CalendarItem
                key={squareNumber}
                date={date}
                isToday={isDateToday(date)}
                memory={currentMemory}
              />
            ) : (
              <div key={`out-of-range-${index}`} />
            );
          })}
        </ul>
      )}
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
