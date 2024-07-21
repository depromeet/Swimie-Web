'use client';

import { ChangeEvent } from 'react';

import { DownArrowIcon } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

import { TextFieldWrapper } from './text-field-wrapper';
import { TextFieldProps } from './type';
import { UseTextField } from './useTextField';

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
  const { text, focused, isWritten, handlers } = UseTextField(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    handlers.changeText(newText);
    onChange && onChange(newText);
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={(variant === 'text' && isWritten) || focused}
      addStyles={addWrapperStyles}
    >
      <div className={css(inputWrapperStyles)}>
        <input
          readOnly={variant === 'select'}
          type={inputType}
          value={text}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleInputChange}
          onFocus={
            variant === 'text' ? () => handlers.changeFocus(true) : undefined
          }
          onBlur={
            variant === 'text' ? () => handlers.changeFocus(false) : undefined
          }
          className={css(
            (variant === 'text' && isWritten) || focused
              ? inputStyles.raw({ isWritten: true })
              : inputStyles.raw({ isWritten: false }),
            addStyles,
          )}
          onClick={onClick}
        />
        {/* span태그 컴포넌트로 공통 생성 시 수정 */}
        <span className={css(absoluteStyles)}>
          {variant === 'select' && hasDownArrow && <DownArrowIcon />}
          {unit}
        </span>
      </div>
      <span className={css(subTextStyles)}>{subText}</span>
    </TextFieldWrapper>
  );
}

const inputWrapperStyles = css.raw({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '2px',
});

const inputStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: '4px 0px',
    borderBottom: '2px solid',
    marginBottom: '3px',
    outline: 'none',
    textStyle: 'heading3',
    fontWeight: '500',
  },
  variants: {
    isWritten: {
      true: { borderBottomColor: 'blue.60' },
      false: { borderBottomColor: 'line.alternative' },
    },
  },
});

const absoluteStyles = css.raw({
  position: 'absolute',
  right: 0,
  textStyle: 'heading4',
  fontWeight: '500',
});

const subTextStyles = css.raw({
  color: 'text.alternative',
  textStyle: 'label1.normal',
  fontWeight: '500',
});
