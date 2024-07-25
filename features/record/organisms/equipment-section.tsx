import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { SelectBox } from '../molecules';
import { sectionStyles } from './style';
import { SectionProps } from './type';

/**
 * @param title 장비 section의 제목
 */
export function EquipmentSection({ title }: SectionProps) {
  return (
    <section className={sectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <div className={itemBoxStyles}>
        {/* //임시 디자인 */}
        {Array.from({ length: 4 }, (_, i) => (
          <SelectBox key={i} />
        ))}
      </div>
    </section>
  );
}

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});

const itemBoxStyles = flex({
  justifyContent: 'space-between',
});
