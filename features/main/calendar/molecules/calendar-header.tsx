import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { CalendarDate, calendarDateAtom } from '@/store';
import { css } from '@/styled-system/css';

import { MoveMonthButton, ViewImageButton } from '../atoms';

export const CalendarHeader = () => {
  const [isViewImage, setIsViewImage] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useAtom(calendarDateAtom);
  const { year, month } = currentDate;

  const handleClickPrevMonth = () => {
    setCurrentDate((prev) => getPrevMonthDate(prev));
  };
  const handleClickNextMonth = () => {
    setCurrentDate((prev) => getNextMonthDate(prev));
  };
  const handleClickViewImage = () => {
    setIsViewImage((prev) => !prev);
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

      <ViewImageButton onClick={handleClickViewImage} isActive={isViewImage} />
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
