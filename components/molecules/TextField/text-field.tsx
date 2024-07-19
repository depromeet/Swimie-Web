'use client';

import { ChangeEvent, useState } from 'react';

import { DownArrowIcon, TextFieldWrapper } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

import { TextFieldProps } from './type';

export function TextField({
  variant,
  inputType = 'text',
  label,
  isRequired = false,
  value,
  subText,
  placeholder,
  unit,
  maxLength,
  addWrapperStyles,
  addStyles,
  onClick,
  onChange,
}: TextFieldProps) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const isWritten = text.trim().length > 0 ? true : false;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange && onChange(newText);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={isWritten || focused}
      addStyles={addWrapperStyles}
    >
      <input
        readOnly={variant === 'select'}
        type={inputType}
        value={value ? value : text}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleInputChange}
        onFocus={variant === 'text' ? handleFocus : undefined}
        onBlur={variant === 'text' ? handleBlur : undefined}
        className={css(
          isWritten || focused
            ? inputStyles.raw({ isWritten: true })
            : inputStyles.raw({}),
          addStyles,
        )}
        onClick={onClick}
      />
      <span className={css(absoluteStyles)}>
        {variant === 'select' && <DownArrowIcon />}
      </span>
      <span className={css(absoluteStyles)}>{unit}</span>
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
    padding: '4px 0px',
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

const absoluteStyles = css.raw({
  position: 'absolute',
  bottom: '6px',
  right: 0,
});
