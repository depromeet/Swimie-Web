'use client';

import { DownArrowIcon, TextFieldWrapper } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

import { SelectTextFieldProps } from './type';

export function SelectTextField({
  isRequired = false,
  subText,
  value,
  placeholder,
  label,
  addStyles,
  addTextStyles,
  addWrapperStyles,
  hasDownArrow = true,
  onClick,
}: SelectTextFieldProps) {
  const hasValue = value === '';
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
        <span
          className={css(
            hasValue
              ? textStyles.raw({ variant: 'placeholder' })
              : textStyles.raw({ variant: 'value' }),
            addTextStyles,
          )}
        >
          {hasValue ? placeholder : value}
        </span>
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
  padding: '4px 0px',
  borderBottom: '2px solid',
  borderBottomColor: 'line.alternative',
});

const textStyles = cva({
  base: {},
  variants: {
    variant: {
      placeholder: { color: '#8B95A1' },
      value: { color: 'text.normal' },
    },
  },
});

const subTextStyles = css.raw({
  color: 'text.alternative',
});
