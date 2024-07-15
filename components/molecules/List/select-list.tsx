import { SelectElement } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SelectListProps } from './type';

export function SelectList({
  options,
  value,
  addStyles,
  addListElementStyles,
  onSelect,
  closeWrapper,
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
          closeWrapper={closeWrapper}
        />
      ))}
    </ul>
  );
}
