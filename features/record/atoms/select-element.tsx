import { CheckIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SelectListProps } from '../molecules';

export interface SelectElementProps
  extends Pick<SelectListProps, 'closeWrapper' | 'onChangeValue'> {
  isSelected: boolean;
  label: string;
  className?: string;
}

export function SelectElement({
  isSelected,
  label,
  className,
  closeWrapper,
  onChangeValue,
}: SelectElementProps) {
  const handleListElementClick = () => {
    onChangeValue?.(label);
    closeWrapper?.();
  };
  return (
    <li className={className} onClick={handleListElementClick}>
      <span>{label}</span>
      <div className={selectedIconStyles}>{isSelected && <CheckIcon />}</div>
    </li>
  );
}

const selectedIconStyles = css({
  position: 'absolute',
  right: 0,
});
