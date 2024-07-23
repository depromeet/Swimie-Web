import { cva } from '@/styled-system/css';

export interface DividerProps {
  variant?: 'thick' | 'normal';
  vertical?: boolean;
  className?: string;
}

export function Divider({
  variant = 'normal',
  vertical = false,
}: DividerProps) {
  return (
    <div
      className={
        vertical
          ? dividerStyles({ isVertical: true })
          : variant === 'thick'
            ? dividerStyles({ isVertical: false, isThick: true })
            : dividerStyles({ isVertical: false, isThick: false })
      }
    />
  );
}

const dividerStyles = cva({
  base: {
    backgroundColor: 'line.normal',
  },
  variants: {
    isVertical: {
      true: {
        width: '1px',
        height: '32px',
      },
      false: {
        width: '100%',
      },
    },
    isThick: {
      true: {
        height: '12px',
      },
      false: {
        height: '1px',
      },
    },
  },
});
