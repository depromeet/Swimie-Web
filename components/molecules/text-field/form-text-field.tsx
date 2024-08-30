'use client';

import React, { ChangeEvent, forwardRef } from 'react';

import { css, cx } from '@/styled-system/css';

import {
  absoluteStyles,
  inputFieldStyles,
  inputWrapperStyles,
  subTextStyles,
} from './style';
import { TextFieldWrapper } from './text-field-wrapper';
import { FormTextFieldProps } from './type';
import { useFormTextField } from './use-form-text-field';

/**
 * @description react-hook-form 내에서 사용할 수 있는 text-field 컴포넌트
 * @param inputType input 태그의 type (기본값: 'text')
 * @param label 라벨 이름
 * @param isRequired 필수 여부
 * @param subText 추가 설명 텍스트
 * @param placeholder placeholder 값
 * @param unit 입력값 단위
 * @param maxLength input의 최대길이
 * @param registerName input 요소를 구독할 때 사용할 name
 * @param className input 태그 추가 스타일
 * @param wrapperClassName text-field-wrapper 컴포넌트 추가 스타일 부여
 * @param absoluteClassName unit 문자 추가 스타일 부여
 * @param subTextClassName 추가 설명 텍스트 추가 스타일
 * @param registerdFieldValue 외부에서 control로 관찰하는 값
 * @param onChange register의 onChange 속성
 * @param name register name
 * @param ref 외부에서 전달된 register ref
 */
export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  (
    {
      inputType = 'text',
      label,
      isRequired = false,
      subText,
      placeholder,
      unit,
      className,
      maxLength,
      wrapperClassName,
      absoluteClassName,
      subTextClassName,
      registerdFieldValue,
      onChange,
      name,
    },
    ref,
  ) => {
    const { focused, isWritten, handlers } =
      useFormTextField(registerdFieldValue);

    const shouldEmphasize = isWritten || focused;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      void onChange(event);
    };

    return (
      <TextFieldWrapper
        isRequired={isRequired}
        label={label}
        changeLabelColor={shouldEmphasize}
        className={wrapperClassName}
      >
        <div className={cx(inputWrapperStyles)}>
          <input
            ref={ref}
            name={name}
            type={inputType}
            placeholder={placeholder}
            maxLength={maxLength}
            onFocus={() => handlers.onChangeFocus(true)}
            onBlur={() => handlers.onChangeFocus(false)}
            onChange={handleInputChange}
            className={cx(
              css(
                shouldEmphasize
                  ? inputFieldStyles.raw({ isWritten: true })
                  : inputFieldStyles.raw({ isWritten: false }),
              ),
              className,
            )}
          />
          {unit && (
            <span className={cx(absoluteStyles, absoluteClassName)}>
              {unit}
            </span>
          )}
        </div>
        <span className={cx(subTextStyles, subTextClassName)}>{subText}</span>
      </TextFieldWrapper>
    );
  },
);

FormTextField.displayName = 'FormTextField';
