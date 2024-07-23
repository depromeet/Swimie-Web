import { SelectListProps } from '@/components/molecules/list/select-list';

import { CheckIcon } from '../icons/check-icon';

export interface SelectElementProps
  extends Pick<SelectListProps, 'value' | 'onSelect' | 'closeWrapper'> {
  isSelected: boolean;
  label: string;
  className?: string;
}

export function SelectElement({
  isSelected,
  value,
  label,
  className,
  onSelect,
  closeWrapper,
}: SelectElementProps) {
  const handleListClick = (value: number) => {
    onSelect && onSelect(value);
    closeWrapper && closeWrapper();
  };
  return (
    <li className={className} onClick={() => handleListClick(value)}>
      {label}
      {isSelected && <CheckIcon />}
    </li>
  );
}
