import { css } from '@/styled-system/css';

import { SelectBox } from '../../molecules/select-box';
import { RecordEquipmentProps } from './type';

export function RecordEquipment({ title }: RecordEquipmentProps) {
  return (
    <section className={recordEquipmentStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <div className={itemBoxStyles}>
        {Array.from({ length: 4 }, (_, i) => (
          <SelectBox key={i} />
        ))}
      </div>
    </section>
  );
}

const recordEquipmentStyles = css({
  padding: '24px 20px 40px 20px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});

const itemBoxStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
});
