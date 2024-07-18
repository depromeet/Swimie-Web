'use client';

import { ChangeEvent, useState } from 'react';

import { TextFieldWrapper } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

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
  const isWritten = text.trim().length > 0 ? true : false;

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={isWritten}
      addStyles={addWrapperStyles}
    >
      <input
        type="text"
        value={text}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleInputChange}
        className={css(
          isWritten
            ? inputStyles.raw({ isWritten: true })
            : inputStyles.raw({}),
          addStyles,
        )}
      />
      <span className={css(subTextStyles)}>{subText}</span>
    </TextFieldWrapper>
  );
}

const inputStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: '10px 0px',
    borderBottom: '2px solid',
    borderBottomColor: 'line.alternative',
    outline: 'none',
  },
  variants: {
    isWritten: {
      true: { borderBottom: '2px solid', borderBottomColor: 'blue.60' },
    },
  },
});

const subTextStyles = css.raw({
  color: 'text.alternative',
});
