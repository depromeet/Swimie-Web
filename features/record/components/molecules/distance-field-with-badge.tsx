'use client';

import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { StrokeName } from '@/types';

import { SwimBadge } from '../atoms';
import { StrokeDistanceFieldsProps } from '../organisms/stroke-distance-fields';

export interface DistanceFieldWithBadgeProps
  extends Omit<StrokeDistanceFieldsProps, 'strokes'> {
  index: number;
  label: StrokeName;
  value: number;
  className?: string;
}

/**
 * @param label 필드의 label 값
 * @param label 필드의 index 값
 * @param value 필드의 value
 * @param assistiveTabIndex 현재 assistiveTabIndex 값
 * @param className 외부 스타일 주입
 * @param onChangeStroke strokes 배열 값 handling function
 */
export function DistanceFieldWithBadge({
  index,
  label,
  value,
  assistiveTabIndex,
  className,
  onChangeStroke,
}: DistanceFieldWithBadgeProps) {
  const isAssistiveTabIndexZero = assistiveTabIndex === 0;
  const unit = isAssistiveTabIndexZero ? 'm' : '바퀴';

  const handleStrokeFieldChange = (text: string) => {
    onChangeStroke?.(index, text);
  };
  return (
    <div className={cx(layoutStyles.field, className)}>
      <div className={layoutStyles.badge}>
        <SwimBadge type={label} />
        <span className={labelStyles}>{label}</span>
      </div>
      <TextField
        inputType="number"
        maxLength={isAssistiveTabIndexZero ? 5 : 3}
        placeholder="0"
        value={value ? String(value) : ''}
        unit={unit}
        className={css({ width: '140px' })}
        onChange={handleStrokeFieldChange}
      />
    </div>
  );
}

const layoutStyles = {
  field: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  badge: flex({
    alignItems: 'center',
  }),
};

const labelStyles = css({
  marginLeft: '10px',
});
