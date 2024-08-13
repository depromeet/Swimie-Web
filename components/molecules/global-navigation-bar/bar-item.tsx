import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface BarItemProps {
  label: string;
  index: number;
  selected: boolean;
  onClick: (index: number) => void;
}

export function BarItem({ label, index, selected, onClick }: BarItemProps) {
  return (
    <div className={layoutStyles} onClick={() => onClick(index)}>
      <div className={css(shapeStyles.raw({ selected }))} />
      <span className={css(labelStyles.raw({ selected }))}>{label}</span>
    </div>
  );
}

const layoutStyles = flex({
  direction: 'column',
  alignItems: 'center',
});

const shapeStyles = cva({
  base: {
    width: '24px',
    height: '24px',
    borderRadius: '5px',
    marginBottom: '4px',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: 'text.neutral',
      },
      false: {
        backgroundColor: 'fill.normal',
      },
    },
  },
});

const labelStyles = cva({
  base: {
    textStyle: 'caption2',
    fontWeight: 500,
  },
  variants: {
    selected: {
      true: {
        color: 'text.neutral',
      },
      false: {
        color: 'text.alternative',
      },
    },
  },
});
