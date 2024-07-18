'use client';

import { ChangeEvent, useState } from 'react';

import { TextFieldWrapper } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { InputTextFieldProps } from './type';

export function InputTextField({
  label,
  isRequired = false,
  subText,
  placeholder,
  maxLength,
  addWrapperStyles,
  addStyles,
  onChange,
}: InputTextFieldProps) {
  const [text, setText] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange && onChange(newText);
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      addStyles={addWrapperStyles}
    >
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleInputChange}
        className={css(inputStyles, addStyles)}
      />
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
