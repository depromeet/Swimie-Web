'use client';

import { SwimBadge } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';

import { StrokeDistanceFieldProps } from './type';

export function StrokeDistanceField({
  label,
  assistiveTabIndex,
  index,
  value,
  className,
  onChange,
}: StrokeDistanceFieldProps) {
  const handleStrokeInfoChange = (text: string) => {
    onChange(index, text);
  };
  return (
    <div className={cx(recordSwimFieldStyles, className)}>
      <div className={badgeStyles}>
        <SwimBadge />
        <span className={labelStyles}>{label}</span>
      </div>
      <TextField
        inputType="number"
        placeholder="0"
        value={value}
        unit={assistiveTabIndex === 0 ? 'm' : '바퀴'}
        className={css({ width: '100px' })}
        onChange={handleStrokeInfoChange}
      />
      {/* {assistiveTabIndex === 0 && (
        <TextField
          inputType="number"
          placeholder="0"
          unit="m"
          className={css({ width: '100px' })}
        />
      )}
      {assistiveTabIndex === 1 && (
        <TextField
          inputType="number"
          placeholder="0"
          unit="바퀴"
          className={css({ width: '100px' })}
        />
      )} */}
    </div>
  );
}

const recordSwimFieldStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const badgeStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const labelStyles = css({
  marginLeft: '10px',
});
