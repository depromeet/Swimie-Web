import { SelectElement } from '@/components/atoms/Element';
import { css } from '@/styled-system/css';

import { SelectListProps } from './type';

export function SelectList({
  options,
  value,
  addStyles,
  addListElementStyles,
  onSelect,
}: SelectListProps) {
  return (
    <ul className={css(addStyles)}>
      {options.map((option) => (
        <SelectElement
          key={option.value}
          isSelected={value === option.value}
          value={option.value}
          label={option.label}
          addStyles={addListElementStyles}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
