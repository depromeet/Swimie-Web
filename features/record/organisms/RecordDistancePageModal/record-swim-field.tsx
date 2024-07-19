import { InputTextField } from '@/components/molecules/TextField/input-text-field';
import { css } from '@/styled-system/css';

import { SwimBadge } from '../../atoms';
import { RecordSwimFieldProps } from './type';

export function RecordSwimField({ label, addStyles }: RecordSwimFieldProps) {
  return (
    <div className={css(recordSwimFieldStyles, addStyles)}>
      <div className={css(badgeStyles)}>
        <SwimBadge />
        <span className={css(labelStyles)}>{label}</span>
      </div>
      <InputTextField
        placeholder="0"
        unit="m"
        addStyles={css.raw({ width: '100px' })}
      />
    </div>
  );
}

const recordSwimFieldStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const badgeStyles = css.raw({
  display: 'flex',
  alignItems: 'center',
});

const labelStyles = css.raw({
  marginLeft: '10px',
});
