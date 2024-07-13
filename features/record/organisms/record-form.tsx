'use client';

import { SelectTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordFormProps {
  styles?: object;
}

export function RecordForm({ styles }: RecordFormProps) {
  return (
    <form className={css(styles)}>
      <SelectTextField
        isRequired
        value="2024년 7월 -일"
        label="수영 날짜"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        isRequired
        value=""
        label="수영 시간"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value=""
        placeholder="(선택)"
        label="수영장"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value=""
        label="레일 길이"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectTextField
        value=""
        placeholder="거리입력(선택)"
        label="수영 거리"
        hasDownArrow={false}
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
    </form>
  );
}
