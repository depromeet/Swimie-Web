import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { CalendarDate, calendarDateAtom, calendarViewImageAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { MoveMonthButton, ViewImageButton } from '../atoms';

export const CalendarHeader = () => {
  const [currentDate, setCurrentDate] = useAtom(calendarDateAtom);
  const [isViewImage, setIsViewImage] = useAtom(calendarViewImageAtom);

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
    <div className={HeaderContainerStyles}>
      <div className={DateButtonContainerStyles}>
        <MoveMonthButton
          width={9}
          height={14}
          direction="left"
          onClick={handleClickPrevMonth}
        />
        <p className={CurrentDateStyles}>
          {formatYearYY(year)}년 {month}월
        </p>
        <MoveMonthButton
          width={9}
          height={14}
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

const HeaderContainerStyles = flex({
  justifyContent: 'space-between',
});

const DateButtonContainerStyles = flex({
  gap: '10px',
  alignItems: 'center',
});

const CurrentDateStyles = css({
  width: '108px',
  textAlign: 'center',
  textStyle: 'heading2',
  fontWeight: 'bold',
});
