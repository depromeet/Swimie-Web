'use client';

import { useFormContext } from 'react-hook-form';

import { FormTextArea } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { formSectionStyles } from '../../styles/form-section';
import { FormSectionProps } from '../../types/form-section';

/**
 * @param title 일기 section의 제목
 * @param value textArea의 value 주입
 */
export function DiarySection({ title }: FormSectionProps) {
  const { register } = useFormContext();
  return (
    <section className={formSectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <FormTextArea
        {...register('diary')}
        placeholder="오늘 무엇을 배웠나요? 오늘 무엇을 느꼈나요?"
      />
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
