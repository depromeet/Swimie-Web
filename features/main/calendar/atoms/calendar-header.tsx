import { css } from '@/styled-system/css';

interface CalendarHeaderProps {
  year: number;
  month: number;
}

export const CalendarHeader = ({ year, month }: CalendarHeaderProps) => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <p>
        {formatYearYY(year)}년 {month}월
      </p>
      <button>사진 보기</button>
    </div>
  );
};

const formatYearYY = (year: number) => {
  return year.toString().substring(2);
};
