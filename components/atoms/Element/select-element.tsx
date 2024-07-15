import { css, cva } from '@/styled-system/css';

import { SelectElementProps } from './type';

export function SelectElement({
  isSelected,
  value,
  label,
  addStyles,
  onSelect,
  closeWrapper,
}: SelectElementProps) {
  const handleListClick = (value: number) => {
    onSelect && onSelect(value);
    closeWrapper && closeWrapper();
  };
  return (
    <li
      className={css(
        isSelected
          ? listElementStyles.raw({ selected: true })
          : listElementStyles.raw({ selected: false }),
        addStyles,
      )}
      onClick={() => handleListClick(value)}
    >
      {label}
    </li>
  );
}

const listElementStyles = cva({
  base: {
    padding: '6px 10px',
  },
  variants: {
    selected: {
      true: { color: 'red' },
      false: { color: 'gray' },
    },
  },
});
