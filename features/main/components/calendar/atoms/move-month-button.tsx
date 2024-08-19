import { ButtonHTMLAttributes } from 'react';

import { type Directions, TriangleArrowIcon } from '@/components/atoms';

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
