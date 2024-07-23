import { css } from '@/styled-system/css';

import { CalendarHeader, CalendarItem, DayLabels } from '../atoms';

export const Calendar = () => {
  const arr = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className={calendarContainer}>
      <CalendarHeader />
      <DayLabels />
      <div className={CalendarGrid}>
        {arr.map((date) => (
          <CalendarItem
            key={date}
            date={date}
            distance={date % 2 === 0 ? 1000 : undefined}
          />
        ))}
      </div>
    </div>
  );
};

const calendarContainer = css({
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
