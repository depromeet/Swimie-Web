import { DateLeftArrowIcon, DateRightArrowIcon } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getFormatDate } from '@/utils';

type DatePicker = {
  recordDateStr: string;
  recordRank: number;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};

export const DatePicker = ({
  recordDateStr,
  recordRank,
  onClickPrevious,
  onClickNext,
}: DatePicker) => {
  const { year, month, day, weekday } = getFormatDate({
    dateStr: recordDateStr,
    padNum: 2,
  });

  return (
    <div className={containerStyle}>
      <div className={pickerWrapperStyle}>
        <button
          onClick={onClickPrevious}
          className={buttonStyle({
            isDisabled: !onClickPrevious,
          })}
          disabled={!onClickPrevious}
        >
          <DateLeftArrowIcon fill={!onClickPrevious ? '#37383c30' : ''} />
        </button>

        <p
          className={textStyle}
        >{`${Number(month)}월 ${recordRank}번째 기록`}</p>
        <button
          onClick={onClickNext}
          className={buttonStyle({
            isDisabled: !onClickNext,
          })}
          disabled={!onClickNext}
        >
          <DateRightArrowIcon fill={!onClickNext ? '#37383c30' : ''} />
        </button>
      </div>
      <div className={dateWrapperStyle}>
        <p className={dateTextStyle}>{`${year}.${month}.${day}.${weekday}`}</p>
      </div>
    </div>
  );
};

const containerStyle = flex({
  justify: 'space-between',
});

const pickerWrapperStyle = flex({
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

const dateWrapperStyle = css({
  p: '4px 10px',
  backgroundColor: 'background.gray',
  rounded: 'full',
});

const dateTextStyle = css({
  textStyle: 'label1.normal',
  color: 'text.alternative',
  fontWeight: 'medium',
});
