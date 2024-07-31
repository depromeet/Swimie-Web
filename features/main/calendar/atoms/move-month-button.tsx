import { ButtonHTMLAttributes } from 'react';

import type { Directions } from '@/components/atoms/icons';
import { TriangleArrowIcon } from '@/components/atoms/icons/triangle-arrow-icon';

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
      <TriangleArrowIcon width={width} height={height} direction={direction} />
    </button>
  );
};
