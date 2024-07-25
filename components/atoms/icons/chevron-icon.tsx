import { css } from '@/styled-system/css';

export type Directions = 'left' | 'up' | 'right' | 'down';

interface ChevronIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  direction: Directions;
}

export const ChevronIcon = ({
  color = 'labels.tertiary',
  direction,
  width,
  height,
  ...props
}: ChevronIconProps) => {
  const degree = getRotateDegree(direction);
  return (
    <svg
      {...props}
      transform={`rotate(${degree})`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={css({ fill: color })}
        d="M16.1368 20.6373C16.4883 20.2858 16.4883 19.716 16.1368 19.3645L8.77318 12.0009L16.1368 4.63728C16.4883 4.2858 16.4883 3.71596 16.1368 3.36448C15.7853 3.01301 15.2155 3.01301 14.864 3.36448L6.864 11.3645C6.51252 11.716 6.51252 12.2858 6.864 12.6373L14.864 20.6373C15.2155 20.9887 15.7853 20.9887 16.1368 20.6373Z"
        fill="#3C3C43"
        fillOpacity="0.3"
      />
    </svg>
  );
};

function getRotateDegree(direction: Directions) {
  if (direction === 'left') return 0;
  else if (direction === 'up') return 90;
  else if (direction === 'right') return 180;
  return 270;
}
