'use client';

import { ChangeEvent } from 'react';

import { css, cx } from '@/styled-system/css';

import {
  absoluteStyles,
  inputFieldStyles,
  inputWrapperStyles,
  subTextStyles,
} from './style';
import { TextFieldWrapper } from './text-field-wrapper';
import { TextFieldProps } from './type';
import { useTextField } from './use-text-field';

/**
 * @description react-hook-form을 사용하지 않을 때 사용할 수 있는 text-field 컴포넌트
 * @param inputType input 태그의 type(default: 'text')
 * @param label 라벨 이름
 * @param isRequired 필수 여부
 * @param value 초기 값
 * @param subText 추가 설명 텍스트
 * @param placeholder placeholder 값
 * @param unit 입력값 단위
 * @param maxLength input의 최대길이
 * @param className input태그 추가 스타일
 * @param wrapperClassName text-field-wrapper 컴포넌트 추가 스타일 부여
 * @param absoluteClassName unit 문자 추가 스타일 부여
 * @param subTextClassName 추가 설명 텍스트 추가 스타일
 * @param onChange change 이벤트
 */
export function TextField({
  inputType = 'text',
  label,
  isRequired = false,
  value,
  subText,
  placeholder,
  unit,
  maxLength,
  className,
  wrapperClassName,
  absoluteClassName,
  subTextClassName,
  onChange,
}: TextFieldProps) {
  const { focused, isWritten, handlers } = useTextField(value);

  const shouldEmphasize = isWritten || focused;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    onChange?.(newText);
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={shouldEmphasize}
      className={wrapperClassName}
    >
      <div className={cx(inputWrapperStyles)}>
        {
          <input
            type={inputType}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleInputChange}
            onFocus={() => handlers.onChangeFocus(true)}
            onBlur={() => handlers.onChangeFocus(false)}
            className={cx(
              css(
                shouldEmphasize
                  ? inputFieldStyles.raw({ isWritten: true })
                  : inputFieldStyles.raw({ isWritten: false }),
              ),
              className,
              inputType === 'number' &&
                css({
                  '&::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '&::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                }),
            )}
          />
        }
        {unit && (
          <span className={cx(absoluteStyles, absoluteClassName)}>{unit}</span>
        )}
      </div>
      <span className={cx(subTextStyles, subTextClassName)}>{subText}</span>
    </TextFieldWrapper>
  );
}
