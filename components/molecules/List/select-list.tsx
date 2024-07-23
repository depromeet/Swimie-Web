import { SelectElement } from '@/components/atoms';

import { DropDownProps } from '../drop-down/drop-down';

export interface SelectListProps
  extends Omit<DropDownProps, 'addStyles' | 'addListStyles'> {
  className?: string;
  listElementClassName?: string;
  closeWrapper?: () => void;
}

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
