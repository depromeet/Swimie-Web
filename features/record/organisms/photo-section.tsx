'use client';

import { css } from '@/styled-system/css';

import { CameraBox } from '../molecules';
import { sectionStyles } from './style';
import { SectionProps } from './type';

/**
 * @param title 사진 section의 제목
 */
export function PhotoSection({ title }: SectionProps) {
  return (
    <section className={sectionStyles}>
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
