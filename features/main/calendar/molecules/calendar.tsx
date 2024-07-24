'use client';

import { useCalendarRendaringData } from '@/hooks/use-calendar-rendering-data';
import { css } from '@/styled-system/css';

import { CalendarItem, DayLabels } from '../atoms';
import { CalendarHeader } from './calendar-header';

export const Calendar = () => {
  const [squares, startPoint, endPoint] = useCalendarRendaringData();

  return (
    <div className={calendarContainer}>
      <CalendarHeader />
      <DayLabels />
      <ul className={CalendarGrid}>
        {squares.map((date, index) =>
          index >= startPoint && index <= endPoint ? (
            <CalendarItem
              key={date}
              date={date - startPoint}
              distance={date % 2 === 0 ? 1000 : undefined}
            />
          ) : (
            <div key={`out-of-range-${index}`} />
          ),
        )}
      </ul>
    </div>
  );
};

const calendarContainer = css({
  width: 'full',
  height: 'full',
  display: 'flex',
  flexDir: 'column',
  gap: '16px',
});

const CalendarGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridRowGap: '10px',
  gridColumnGap: '3px',
  color: 'text.alternative',
});
