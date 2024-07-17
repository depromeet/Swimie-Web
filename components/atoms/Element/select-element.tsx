import { css } from '@/styled-system/css';

import { CheckIcon } from '../Icons';
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
    <li className={css(addStyles)} onClick={() => handleListClick(value)}>
      {label}
      {isSelected && <CheckIcon />}
    </li>
  );
}
