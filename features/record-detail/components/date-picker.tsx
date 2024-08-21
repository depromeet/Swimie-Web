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
        <button onClick={onClickPrevious}>
          <DateLeftArrowIcon />
        </button>
      )}
      <p className={textStyle}>{`${year}.${month}.${day}.${weekday}`}</p>
      {onClickNext && (
        <button onClick={onClickNext}>
          <DateRightArrowIcon />
        </button>
      )}
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
