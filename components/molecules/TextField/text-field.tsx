'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { DownArrowIcon, TextFieldWrapper } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

import { TextFieldProps } from './type';

export function TextField({
  variant = 'text',
  inputType = 'text',
  label,
  isRequired = false,
  value,
  subText,
  hasDownArrow = false,
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

  //variant==='text' 이고 값이 있으면 border가 blue.60으로 되어있도록
  useEffect(() => {
    if (value) setText(value);
  }, [value]);

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={(variant === 'text' && isWritten) || focused}
      addStyles={addWrapperStyles}
    >
      <input
        readOnly={variant === 'select'}
        type={inputType}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleInputChange}
        onFocus={variant === 'text' ? handleFocus : undefined}
        onBlur={variant === 'text' ? handleBlur : undefined}
        className={css(
          (variant === 'text' && isWritten) || focused
            ? inputStyles.raw({ isWritten: true })
            : inputStyles.raw({}),
          addStyles,
        )}
        onClick={onClick}
      />
      <span
        className={css(
          subText
            ? absoluteStyles.raw({ hasSubText: true })
            : absoluteStyles.raw({ hasSubText: false }),
        )}
      >
        {variant === 'select' && hasDownArrow && <DownArrowIcon />}
      </span>
      <span
        className={css(
          subText
            ? absoluteStyles.raw({ hasSubText: true })
            : absoluteStyles.raw({ hasSubText: false }),
        )}
      >
        {unit}
      </span>
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
    padding: '5px 0px',
    marginBottom: '3px',
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

const absoluteStyles = cva({
  base: { position: 'absolute', right: 0 },
  variants: {
    hasSubText: {
      true: { bottom: '32px' },
      false: { bottom: '10px' },
    },
  },
});
