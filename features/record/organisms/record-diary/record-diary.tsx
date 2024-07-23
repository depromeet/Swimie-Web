import { css } from '@/styled-system/css';

import { TextArea } from '../../molecules/text-area';
import { RecordDiaryProps } from './type';

export function RecordDiary({ title }: RecordDiaryProps) {
  return (
    <div className={recordDiaryStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <TextArea placeholder="오늘 무엇을 배웠나요? 오늘 무엇을 느꼈나요?" />
    </div>
  );
}

const recordDiaryStyles = css({
  padding: '24px 20px 40px 20px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
