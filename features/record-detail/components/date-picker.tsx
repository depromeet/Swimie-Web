import { DateLeftArrowIcon, DateRightArrowIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getFormatDate } from '@/utils';

type DatePicker = {
  recordDateStr: string;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};

export const DatePicker = ({
  recordDateStr,
  onClickPrevious,
  onClickNext,
}: DatePicker) => {
  const { year, month, day, weekday } = getFormatDate({
    dateStr: recordDateStr,
    padNum: 2,
  });

  return (
    <div className={containerStyle}>
      {onClickPrevious && (
        <button onClick={onClickPrevious} className={buttonStyle}>
          <DateLeftArrowIcon />
        </button>
      )}
      <p className={textStyle}>{`${year}.${month}.${day}.${weekday}`}</p>
      {onClickNext && (
        <button onClick={onClickNext} className={buttonStyle}>
          <DateRightArrowIcon />
        </button>
      )}
    </div>
  );
};

const containerStyle = flex({
  gap: '5px',
  align: 'center',
});

const textStyle = css({
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  color: 'text.alternative',
});

const buttonStyle = flex({
  width: '20px',
  height: '20px',
  justify: 'center',
  align: 'center',
  cursor: 'pointer',
});
