import { SelectElement } from '../atoms';

type optionType = {
  index: number;
  label: string;
};

export interface SelectListProps {
  value: string;
  options: optionType[];
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
          key={option.index}
          isSelected={value === option.label}
          label={option.label}
          className={listElementClassName}
          closeWrapper={closeWrapper}
          onChangeValue={onChangeValue}
        />
      ))}
    </ul>
  );
}
