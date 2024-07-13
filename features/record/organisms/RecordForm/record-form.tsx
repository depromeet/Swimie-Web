'use client';

import { SelectTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { UseRecordForm } from './useRecordForm';

interface RecordFormProps {
  styles?: object;
}

export function RecordForm({ styles }: RecordFormProps) {
  const { recordInfo, handlers } = UseRecordForm('2024년 7월 -일');

  console.log(handlers);

  return (
    <form className={css(styles)}>
      <SelectTextField
        isRequired
        value={recordInfo.date}
        label="수영 날짜"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <div className={css(timeTextFieldLayoutStyles)}>
        <SelectTextField
          isRequired
          value={recordInfo.startTime}
          label="수영 시간"
          wrapperStyles={timeTextFieldStyles}
        />
        <span className={css({ fontSize: '30px' })}>-</span>
        <SelectTextField
          isRequired
          value={recordInfo.startTime}
          label="수영 시간"
          wrapperStyles={timeTextFieldStyles}
        />
      </div>
      <SelectTextField
        value={recordInfo.pool}
        placeholder="(선택)"
        label="수영장"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value={recordInfo.railLength}
        label="레일 길이"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value={recordInfo.distance}
        placeholder="거리입력(선택)"
        label="수영 거리"
        hasDownArrow={false}
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
    </form>
  );
}

const timeTextFieldLayoutStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const timeTextFieldStyles = css.raw({
  width: '42%',
  marginBottom: '24px',
});
