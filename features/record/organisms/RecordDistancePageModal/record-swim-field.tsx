import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { SwimBadge } from '../../atoms';
import { RecordSwimFieldProps } from './type';

export function RecordSwimField({
  label,
  assistiveTabIndex,
  addStyles,
}: RecordSwimFieldProps) {
  return (
    <div className={css(recordSwimFieldStyles, addStyles)}>
      <div className={css(badgeStyles)}>
        <SwimBadge />
        <span className={css(labelStyles)}>{label}</span>
      </div>
      {assistiveTabIndex === 0 && (
        <TextField
          inputType="number"
          placeholder="0"
          unit="m"
          addStyles={css.raw({ width: '100px' })}
        />
      )}
      {assistiveTabIndex === 1 && (
        <TextField
          inputType="number"
          placeholder="0"
          unit="바퀴"
          addStyles={css.raw({ width: '100px' })}
        />
      )}
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
