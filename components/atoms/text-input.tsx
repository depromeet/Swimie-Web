'use client';

import { ChangeEvent, useState } from 'react';

import { css } from '@/styled-system/css';

interface TextInputProps {
  placeholder: string;
  maxLength: number;
  styles?: object;
  onChange: (text: string) => void;
}

export function TextInput({
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
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      maxLength={maxLength}
      className={css(textInputStyles, styles)}
    />
  );
}

const textInputStyles = {
  width: '100%',
};
