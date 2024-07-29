'use client';

import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { SwimBadge } from '../atoms';

export interface DistanceFieldWithBadgeProps {
  label: string;
  assistiveTabIndex: number;
  className?: string;
}

export function DistanceFieldWithBadge({
  label,
  assistiveTabIndex,
  className,
}: DistanceFieldWithBadgeProps) {
  return (
    <div className={cx(layoutStyles.field, className)}>
      <div className={layoutStyles.badge}>
        <SwimBadge />
        <span className={labelStyles}>{label}</span>
      </div>
      <TextField
        inputType="number"
        placeholder="0"
        unit={assistiveTabIndex === 0 ? 'm' : '바퀴'}
        className={css({ width: '140px' })}
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
