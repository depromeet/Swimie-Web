import { ButtonHTMLAttributes } from 'react';

import type { Directions } from '@/components/atoms';
import { ChevronIcon } from '@/components/atoms';

interface MoveMonthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
  direction: Directions;
}

export const MoveMonthButton = ({
  className,
  width,
  height,
  direction,
  ...props
}: MoveMonthButtonProps) => {
  return (
    <button className={className} {...props}>
      <ChevronIcon width={width} height={height} direction={direction} />
    </button>
  );
};
