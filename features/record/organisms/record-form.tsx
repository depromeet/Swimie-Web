'use client';

import { SelectInput } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordFormProps {
  styles?: object;
}

export function RecordForm({ styles }: RecordFormProps) {
  return (
    <form className={css(styles)}>
      <SelectInput
        isRequired
        value=""
        label="수영 날짜"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectInput
        isRequired
        value=""
        label="수영 시간"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectInput
        value=""
        placeholder="(선택)"
        label="수영장"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectInput
        value=""
        label="레일 길이"
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <SelectInput
        value=""
        placeholder="거리입력(선택)"
        label="수영 거리"
        hasDownArrow={false}
        wrapperStyles={css.raw({ marginBottom: '24px' })}
      />
    </form>
  );
}
