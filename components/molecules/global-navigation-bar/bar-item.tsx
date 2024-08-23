import Link from 'next/link';
import { FunctionComponent, SVGProps } from 'react';

import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface BarItemProps {
  label: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  index: number;
  route: string;
  isSelected: boolean;
  onClick: (index: number) => void;
}

export function BarItem({
  label,
  icon: Icon,
  index,
  route,
  isSelected,
  onClick,
}: BarItemProps) {
  return (
    <Link href={route} className={layoutStyles} onClick={() => onClick(index)}>
      {
        <Icon
          className={iconStyles}
          fill={isSelected ? '#37383C' : '#37383C47'}
        />
      }
      <span className={css(labelStyles.raw({ isSelected }))}>{label}</span>
    </Link>
  );
}

const layoutStyles = flex({
  direction: 'column',
  alignItems: 'center',
});

const iconStyles = css({
  marginBottom: '4px',
});

const labelStyles = cva({
  base: {
    textStyle: 'caption2',
    fontWeight: 500,
  },
  variants: {
    isSelected: {
      true: {
        color: 'text.neutral',
      },
      false: {
        color: 'text.alternative',
      },
    },
  },
});
