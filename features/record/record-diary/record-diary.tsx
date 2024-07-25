import { TextArea } from '@/components/molecules';
import { css } from '@/styled-system/css';

interface RecordDiaryProps {
  title: string;
  value: string;
  onChange?: (text: string) => void;
}

export function RecordDiary({ title, value, onChange }: RecordDiaryProps) {
  return (
    <section className={recordDiaryStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <TextArea
        placeholder="오늘 무엇을 배웠나요? 오늘 무엇을 느꼈나요?"
        value={value}
        onChange={onChange}
      />
    </section>
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
