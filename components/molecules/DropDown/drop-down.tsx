import { css } from '@/styled-system/css';

import { SelectList } from '../List';
import { DropDownProps } from './type';

export function DropDown({
  options,
  value,
  addStyles,
  addListStyles,
  addListElementStyles,
  onSelect,
}: DropDownProps) {
  return (
    <div className={css(dropDownStyles, addStyles)}>
      <SelectList
        options={options}
        value={value}
        addStyles={addListStyles}
        addListElementStyles={addListElementStyles}
        onSelect={onSelect}
      />
    </div>
  );
}

const dropDownStyles = css.raw({
  width: '100%',
  backgroundColor: 'white',
  border: '1px solid',
  padding: '10px',
});
