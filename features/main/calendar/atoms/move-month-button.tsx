import { ButtonHTMLAttributes } from 'react';

import { ChevronIcon } from '@/components/atoms';
import { Directions } from '@/components/atoms/icons/chevron-icon';

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
