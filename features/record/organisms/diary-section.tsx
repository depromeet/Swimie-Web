import { TextArea } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { sectionStyles } from './style';
import { SectionProps } from './type';

interface DiarySectionProps extends SectionProps {
  value: string;
  onChange?: (text: string) => void;
}

/**
 * @param title 일기 section의 제목
 * @param value textArea의 value 주입
 * @param onChange 주입된 value 값을 변경하는 function
 */
export function DiarySection({ title, value, onChange }: DiarySectionProps) {
  return (
    <section className={sectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <TextArea
        placeholder="오늘 무엇을 배웠나요? 오늘 무엇을 느꼈나요?"
        value={value}
        onChange={onChange}
      />
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
