'use client';

import {
  DownArrow,
  TextFieldProps,
  TextFieldWrapper,
} from '@/components/atoms';
import { css } from '@/styled-system/css';

interface OptionsInputProps extends Omit<TextFieldProps, 'maxLength'> {
  value: string;
  label: string;
  wrapperStyles?: object;
  hasDownArrow?: boolean;
  onClick?: () => void;
}

export function SelectTextField({
  isRequired = false,
  value,
  placeholder,
  label,
  styles,
  wrapperStyles,
  hasDownArrow = true,
  onClick,
}: OptionsInputProps) {
  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick && onClick();
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      wrapperStyles={wrapperStyles}
    >
      <div className={css(inputStyles, styles)} onClick={handleInputClick}>
        <span>{value === '' ? placeholder : value}</span>
        {hasDownArrow && <DownArrow />}
      </div>
    </TextFieldWrapper>
  );
}

const inputStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0px',
  borderBottom: '1px solid',
});
