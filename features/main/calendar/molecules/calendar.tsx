'use client';

import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

import { calendarDateAtom } from '@/store';
import { css } from '@/styled-system/css';

import { CalendarItem, DayLabels } from '../atoms';
import { CalendarHeader } from './calendar-header';

const CALENDAR_FORMAT_5_COLUMNS = 35;
const CALENDAR_FORMAT_6_COLUMNS = 42;

export const Calendar = () => {
  const currentDate = useAtomValue(calendarDateAtom);

  const { year, month } = currentDate;
  const dateObj = dayjs(`${year}-${month}-01`);
  const startPoint = dateObj.get('day');
  const totalDays = dateObj.add(1, 'month').subtract(1, 'day').get('date');
  const endPoint = startPoint + totalDays - 1;
  const squares = Array.from(
    {
      length:
        endPoint >= CALENDAR_FORMAT_5_COLUMNS
          ? CALENDAR_FORMAT_6_COLUMNS
          : CALENDAR_FORMAT_5_COLUMNS,
    },
    (_, i) => i + 1,
  );

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
