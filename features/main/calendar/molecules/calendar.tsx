'use client';

import { useCalendarRendaringData } from '@/hooks/use-calendar-rendering-data';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CalendarItem, DayLabels } from '../atoms';
import { CalendarHeader } from './calendar-header';

export const Calendar = () => {
  const [squares, startPoint, endPoint, isDateToday] =
    useCalendarRendaringData();

  return (
    <div className={calendarContainerStyles}>
      <CalendarHeader />
      <DayLabels />
      <ul className={CalendarGridStyles}>
        {squares.map((squareNumber, index) => {
          const isInRenderingRange = index >= startPoint && index <= endPoint;
          const date = squareNumber - startPoint;

          return isInRenderingRange ? (
            <CalendarItem
              key={squareNumber}
              date={date}
              isToday={isDateToday(date)}
            />
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
  height: 'full',
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
