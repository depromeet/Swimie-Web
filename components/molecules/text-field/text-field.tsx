'use client';

import { ChangeEvent } from 'react';

import { css, cx } from '@/styled-system/css';
import { preventMinus } from '@/utils';

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
 * @param step 소수점 단위 제한
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
  step,
  maxLength,
  className,
  wrapperClassName,
  absoluteClassName,
  subTextClassName,
  onChange,
}: TextFieldProps) {
  const { focused, isWritten, handlers } = useTextField(value);

  const shouldEmphasize = isWritten || focused;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    let numValue = parseFloat(event.target.value);

    //소수점 단위가 제한되어 있을 때
    if (step && numValue % step !== 0) {
      numValue = Math.round(numValue * 2) / 2;
      newValue = numValue.toString();
    }

    const lengthWithoutDecimal = newValue.replace('.', '').length;

    //소수점도 고려한 maxLength 적용
    if (maxLength && lengthWithoutDecimal >= maxLength) {
      newValue = newValue.slice(
        0,
        maxLength + (newValue.includes('.') ? 2 : 0),
      );
    }
    void onChange?.(newValue);
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
            inputMode={inputType === 'number' ? 'decimal' : undefined}
            pattern={inputType === 'number' ? '[0-9]*' : undefined}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleInputChange}
            onFocus={() => handlers.onChangeFocus(true)}
            onBlur={() => handlers.onChangeFocus(false)}
            onKeyDown={inputType === 'number' ? preventMinus : undefined}
            className={cx(
              css(
                shouldEmphasize
                  ? inputFieldStyles.raw({ isWritten: true })
                  : inputFieldStyles.raw({ isWritten: false }),
              ),
              inputType === 'number' && deleteArrowStyle,
              className,
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

const deleteArrowStyle = css({
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});
