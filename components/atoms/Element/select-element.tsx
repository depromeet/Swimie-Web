import { CheckIcon } from '../icons/check-icon';
import { SelectElementProps } from './type';

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
