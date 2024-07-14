'use client';

import { ReactNode, useState } from 'react';

import {
  DownArrow,
  TextFieldProps,
  TextFieldWrapper,
} from '@/components/atoms';
import { css } from '@/styled-system/css';

interface SelectTextFieldProps extends Omit<TextFieldProps, 'maxLength'> {
  value: string;
  label: string;
  addWrapperStyles?: object;
  hasDownArrow?: boolean;
  dropDownComponent?: ReactNode;
  onClick?: () => void;
}

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
      addWrapperStyles={addWrapperStyles}
    >
      <div className={css(inputStyles, addStyles)} onClick={handleInputClick}>
        <span>{value === '' ? placeholder : value}</span>
        {hasDownArrow && <DownArrow />}
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
