import { ButtonHTMLAttributes } from 'react';

import {
  type Directions,
  TriangleArrowIcon,
  TriangleArrowIconReverse,
} from '@/components/atoms';

interface MoveMonthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
  direction?: Directions;
}

export const MoveMonthButton = ({
  className,
  width,
  height,
  direction = 'left',
  ...props
}: MoveMonthButtonProps) => {
  return (
    <button className={className} {...props}>
      {direction === 'left' ? (
        <TriangleArrowIcon width={width} height={height} />
      ) : (
        <TriangleArrowIconReverse width={width} height={height} />
      )}
    </button>
  );
};
