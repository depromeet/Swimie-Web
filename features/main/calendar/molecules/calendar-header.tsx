import { css } from '@/styled-system/css';

import { MoveMonthButton } from '../atoms';

interface CalendarHeaderProps {
  year: number;
  month: number;
}

export const CalendarHeader = ({ year, month }: CalendarHeaderProps) => {
  return (
    <div className={HeaderContainer}>
      <div className={DateButtonContainer}>
        <MoveMonthButton width={24} height={24} direction="left" />
        <p className={css({ textStyle: 'heading2', fontWeight: 'bold' })}>
          {formatYearYY(year)}년 {month}월
        </p>
        <MoveMonthButton width={24} height={24} direction="right" />
      </div>

      <button>사진 보기</button>
    </div>
  );
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
