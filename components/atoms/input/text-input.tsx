'use client';

import { ChangeEvent, useState } from 'react';

import { InputWrapper } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { InputProps } from './type';

interface TextInputProps extends InputProps {
  onChange: (text: string) => void;
}

export function TextInput({
  isRequired = false,
  label,
  placeholder,
  maxLength,
  styles,
  onChange,
}: TextInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    const newValue = e.target.value;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <InputWrapper isRequired={isRequired} label={label}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
        className={css(textInputStyles, styles)}
      />
    </InputWrapper>
  );
}

const textInputStyles = {
  width: '100%',
  padding: '6px 0px',
  borderBottom: '1px solid black',
};
