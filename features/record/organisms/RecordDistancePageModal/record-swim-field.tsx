import { css } from '@/styled-system/css';

import { SwimBadge } from '../../atoms';
import { RecordSwimFieldProps } from './type';

export function RecordSwimField({ label, addStyles }: RecordSwimFieldProps) {
  return (
    <div className={css(recordSwimFieldStyles, addStyles)}>
      <SwimBadge />
      <span className={css(labelStyles)}>{label}</span>
      {/* Textfield 컴포넌트 */}
    </div>
  );
}

const recordSwimFieldStyles = css.raw({
  display: 'flex',
  alignItems: 'center',
});

const labelStyles = css.raw({
  marginLeft: '10px',
});
