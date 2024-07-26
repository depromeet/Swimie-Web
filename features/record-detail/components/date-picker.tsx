import { DateLeftArrowIcon, DateRightArrowIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

type DatePicker = {
  date: Date;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

export const DatePicker = ({
  date,
  onClickPrevious,
  onClickNext,
}: DatePicker) => {
  const getFormatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];

    return `${year}.${month}.${day}.${weekday}`;
  };

  return (
    <div className={containerStyle}>
      <button onClick={onClickPrevious}>
        <DateLeftArrowIcon />
      </button>
      <p className={textStyle}>{getFormatDate(date)}</p>
      <button onClick={onClickNext}>
        <DateRightArrowIcon />
      </button>
    </div>
  );
};

const containerStyle = flex({
  gap: '4px',
  align: 'center',
});

const textStyle = css({
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'text.alternative',
});
