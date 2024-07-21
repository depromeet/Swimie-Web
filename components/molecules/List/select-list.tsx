import { SelectElement } from '@/components/atoms';

import { SelectListProps } from './type';

export function SelectList({
  options,
  value,
  className,
  listElementClassName,
  onSelect,
  closeWrapper,
}: SelectListProps) {
  return (
    <ul className={className}>
      {options.map((option) => (
        <SelectElement
          key={option.value}
          isSelected={value === option.value}
          value={option.value}
          label={option.label}
          className={listElementClassName}
          onSelect={onSelect}
          closeWrapper={closeWrapper}
        />
      ))}
    </ul>
  );
}
