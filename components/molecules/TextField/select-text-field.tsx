'use client';

import { DownArrowIcon, TextFieldWrapper } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SelectTextFieldProps } from './type';

export function SelectTextField({
  isRequired = false,
  subText,
  value,
  placeholder,
  label,
  addStyles,
  addWrapperStyles,
  hasDownArrow = true,
  onClick,
}: SelectTextFieldProps) {
  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
      </div>
      <span className={css(subTextStyles)}>{subText}</span>
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

const subTextStyles = css.raw({
  color: 'text.alternative',
});
