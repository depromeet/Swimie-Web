import { SelectElement } from '../atoms';

export interface SelectListProps {
  value: string;
  options: string[];
  listClassName?: string;
  className?: string;
  listElementClassName?: string;
  closeWrapper?: () => void;
  onChangeValue?: (value: string) => void;
}

export function SelectList({
  value,
  options,
  className,
  listElementClassName,
  closeWrapper,
  onChangeValue,
}: SelectListProps) {
  return (
    <ul className={className}>
      {options.map((option) => (
        <SelectElement
          key={option}
          isSelected={value === option}
          label={option}
          className={listElementClassName}
          closeWrapper={closeWrapper}
          onChangeValue={onChangeValue}
        />
      ))}
    </ul>
  );
}
