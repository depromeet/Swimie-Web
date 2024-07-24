import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { CalendarDate, calendarDateAtom } from '@/store';
import { css } from '@/styled-system/css';

import { MoveMonthButton } from '../atoms';

export const CalendarHeader = () => {
  const [currentDate, setCurrentDate] = useAtom(calendarDateAtom);
  const { year, month } = currentDate;

  const handleClickPrevMonth = () => {
    setCurrentDate((prev) => getPrevMonthDate(prev));
  };
  const handleClickNextMonth = () => {
    setCurrentDate((prev) => getNextMonthDate(prev));
  };

  return (
    <div className={HeaderContainer}>
      <div className={DateButtonContainer}>
        <MoveMonthButton
          width={24}
          height={24}
          direction="left"
          onClick={handleClickPrevMonth}
        />
        <p className={css({ textStyle: 'heading2', fontWeight: 'bold' })}>
          {formatYearYY(year)}년 {month}월
        </p>
        <MoveMonthButton
          width={24}
          height={24}
          direction="right"
          onClick={handleClickNextMonth}
        />
      </div>

      <button>사진 보기</button>
    </div>
  );
};

const getPrevMonthDate = ({ year, month }: CalendarDate): CalendarDate => {
  const date = dayjs(`${year}-${month}-01`).subtract(1, 'month');
  return { year: date.get('year'), month: date.get('month') + 1 };
};

const getNextMonthDate = ({ year, month }: CalendarDate): CalendarDate => {
  const date = dayjs(`${year}-${month}-01`).add(1, 'month');
  return { year: date.get('year'), month: date.get('month') + 1 };
};

const formatYearYY = (year: number) => {
  return year.toString().substring(2);
};

const HeaderContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const DateButtonContainer = css({
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
});
