import { DateLeftArrowIcon, DateRightArrowIcon } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';
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
      <button
        onClick={onClickPrevious}
        className={buttonStyle({
          isDisabled: !onClickPrevious,
        })}
        disabled={!onClickPrevious}
      >
        <DateLeftArrowIcon fill={!onClickPrevious ? '#37383c50' : ''} />
      </button>

      <p className={textStyle}>{`${year}.${month}.${day}.${weekday}`}</p>
      <button
        onClick={onClickNext}
        className={buttonStyle({
          isDisabled: !onClickNext,
        })}
        disabled={!onClickNext}
      >
        <DateRightArrowIcon fill={!onClickNext ? '#37383c50' : ''} />
      </button>
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

const buttonStyle = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
  },
  variants: {
    isDisabled: {
      false: {
        cursor: 'pointer',
      },
    },
  },
});
