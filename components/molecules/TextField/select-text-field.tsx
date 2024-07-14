'use client';

import { useState } from 'react';

import { DownArrowIcon, TextFieldWrapper } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SelectTextFieldProps } from './type';

export function SelectTextField({
  isRequired = false,
  value,
  placeholder,
  label,
  addStyles,
  addWrapperStyles,
  hasDownArrow = true,
  dropDownComponent,
  onClick,
}: SelectTextFieldProps) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDropDownOpen((prev) => !prev);
    onClick && onClick();
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      addStyles={addWrapperStyles}
    >
      <div className={css(inputStyles, addStyles)} onClick={handleInputClick}>
        <span>{value === '' ? placeholder : value}</span>
        {hasDownArrow && <DownArrowIcon />}
        {dropDownOpen && dropDownComponent}
      </div>
    </TextFieldWrapper>
  );
}

const inputStyles = css.raw({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0px',
  borderBottom: '1px solid',
});
