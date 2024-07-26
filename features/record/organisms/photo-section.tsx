'use client';

import { css } from '@/styled-system/css';

import { CameraBox } from '../molecules';
import { formSectionStyles } from '../style/form-section';
import { FormSectionProps } from '../type/form-section';

/**
 * @param title 사진 section의 제목
 */
export function PhotoSection({ title }: FormSectionProps) {
  return (
    <section className={formSectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <CameraBox />
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
