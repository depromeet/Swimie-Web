'use client';

import { useFormContext } from 'react-hook-form';

import { TextArea } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { formSectionStyles } from '../../styles/form-section';
import { FormSectionProps } from '../../types/form-section';

interface DiarySectionProps extends FormSectionProps {
  value: string;
}

/**
 * @param title 일기 section의 제목
 * @param value textArea의 value 주입
 */
export function DiarySection({ title, value }: DiarySectionProps) {
  const { setValue } = useFormContext();

  const handleTextAreaChange = (text: string) => {
    if (text) setValue('diary', text);
    else {
      setValue('diary', undefined);
    }
  };
  return (
    <section className={formSectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <TextArea
        placeholder="오늘 무엇을 배웠나요? 오늘 무엇을 느꼈나요?"
        value={value}
        onChange={handleTextAreaChange}
      />
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
