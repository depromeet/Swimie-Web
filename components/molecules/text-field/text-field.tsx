'use client';

import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { css, cva, cx } from '@/styled-system/css';

import {
  absoluteStyles,
  inputStyles,
  inputWrapperStyles,
  subTextStyles,
} from './style';
import { TextFieldWrapper } from './text-field-wrapper';
import { TextFieldProps } from './type';
import { useTextField } from './use-text-field';

/**
 * text-field 컴포넌트.
 * @param inputType input 태그의 type(default: 'text')
 * @param label 라벨 이름
 * @param isRequired 필수 여부
 * @param value 초기 값
 * @param subText 추가 설명 텍스트
 * @param placeholder placeholder 값
 * @param unit 입력값 단위
 * @param maxLength input의 최대길이
 * @param registerName input 요소를 구독할 때 사용할 name
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
  registerName,
  className,
  wrapperClassName,
  absoluteClassName,
  subTextClassName,
  onChange,
}: TextFieldProps) {
  const { register } = useFormContext();
  const { focused, isWritten, handlers } = useTextField(value, registerName);

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
        {registerName ? (
          //react-hook-form의 register를 사용할 때
          <input
            {...register(registerName, {
              valueAsNumber: inputType === 'number' ? true : false,
            })}
            type={inputType}
            placeholder={placeholder}
            onFocus={() => handlers.onChangeFocus(true)}
            onBlur={() => handlers.onChangeFocus(false)}
            className={cx(
              css(
                shouldEmphasize
                  ? inputFieldStyles.raw({ isWritten: true })
                  : inputFieldStyles.raw({ isWritten: false }),
              ),
              className,
            )}
          />
        ) : (
          //react-hook-form을 사용하지 않을 때
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
            )}
          />
        )}
        {unit && (
          <span className={cx(absoluteStyles, absoluteClassName)}>{unit}</span>
        )}
      </div>
      <span className={cx(subTextStyles, subTextClassName)}>{subText}</span>
    </TextFieldWrapper>
  );
}

const inputFieldStyles = cva({
  base: inputStyles,
  variants: {
    isWritten: {
      true: { borderBottomColor: 'blue.60' },
      false: { borderBottomColor: 'line.alternative' },
    },
  },
});
