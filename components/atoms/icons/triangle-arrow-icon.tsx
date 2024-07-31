import { css } from '@/styled-system/css';
import { getRotateDegree } from '@/utils/icons';

import type { Directions } from './types';

interface TriangleArrowIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  direction: Directions;
}

export const TriangleArrowIcon = ({
  color = 'labels.tertiary',
  direction,
  width,
  height,
  ...props
}: TriangleArrowIconProps) => {
  const degree = getRotateDegree(direction);
  return (
    <svg
      {...props}
      transform={`rotate(${degree})`}
      width={width}
      height={height}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={css({ fill: color })}
        d="M0.981468 7.7603C0.514323 7.36112 0.514321 6.639 0.981467 6.23982L7.30446 0.836695C7.95343 0.282135 8.9541 0.743294 8.9541 1.59694L8.9541 12.4032C8.9541 13.2568 7.95343 13.718 7.30446 13.1634L0.981468 7.7603Z"
        fill="#37383C"
        fillOpacity="0.16"
      />
    </svg>
  );
};
