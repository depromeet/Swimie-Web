'use client';

import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { SwimBadge } from '../atoms';
import { StrokeDistanceFieldsProps } from '../organisms/stroke-distance-fields';

export interface DistanceFieldWithBadgeProps extends StrokeDistanceFieldsProps {
  index: number;
  label: string;
  value: number;
  className?: string;
}

/**
 * @param label 필드의 label 값
 * @param assistiveTabIndex 현재 assistiveTabIndex 값
 * @param className 외부 스타일 주입
 */
export function DistanceFieldWithBadge({
  index,
  label,
  value,
  assistiveTabIndex,
  className,
  onChangeStroke,
}: DistanceFieldWithBadgeProps) {
  const unit = assistiveTabIndex === 0 ? 'm' : '바퀴';

  const handleStrokeFieldChange = (text: string) => {
    onChangeStroke?.(index, text);
  };
  return (
    <div className={cx(layoutStyles.field, className)}>
      <div className={layoutStyles.badge}>
        <SwimBadge />
        <span className={labelStyles}>{label}</span>
      </div>
      <TextField
        inputType="number"
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
