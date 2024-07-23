import { css, cx } from '@/styled-system/css';

import { SelectList } from '../list';

export interface DropDownProps {
  options: { value: number; label: string }[];
  value: number;
  className?: string;
  listClassName?: string;
  listElementClassName?: string;
  onSelect?: (value: number) => void;
}

export function DropDown({
  options,
  value,
  className,
  listClassName,
  listElementClassName,
  onSelect,
}: DropDownProps) {
  return (
    <div className={cx(dropDownStyles, className)}>
      <SelectList
        options={options}
        value={value}
        className={listClassName}
        listElementClassName={listElementClassName}
        onSelect={onSelect}
      />
    </div>
  );
}

const dropDownStyles = css({
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid',
  padding: '10px',
});
