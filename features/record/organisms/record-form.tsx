'use client';

import { TextInput } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordFormProps {
  styles?: object;
}

export function RecordForm({ styles }: RecordFormProps) {
  const abc = (text: string) => {
    console.log(text);
  };
  return (
    <form className={css(recordFormStyles, styles)}>
      <TextInput
        label="수영 거리"
        placeholder="거리입력(선택)"
        maxLength={10}
        onChange={abc}
      />
    </form>
  );
}

const recordFormStyles = css.raw({
  padding: '0px 20px',
});
