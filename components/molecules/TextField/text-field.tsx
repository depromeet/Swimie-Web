'use client';

import { ChangeEvent } from 'react';

import { DownArrowIcon } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';

import { TextFieldWrapper } from './text-field-wrapper';
import { TextFieldProps } from './type';
import { UseTextField } from './useTextField';

/**
 * text-field 컴포넌트.
 * @param variant text-field의 종류(default: 'text')
 * @param inputType input 태그의 type(default: 'text')
 * @param label 라벨 이름
 * @param isRequired 필수 여부
 * @param value 초기 값
 * @param subText 추가 설명 텍스트
 * @param hasDownArrow variant==='select'일 때 화살표 표시 여부
 * @param placeholder placeholder 값
 * @param unit variant==='type' 일 때 입력값 단위
 * @param maxLength input의 최대길이
 * @param addStyles input태그 추가 스타일
 * @param addWrapperStyles text-field-wrapper 컴포넌트 추가 스타일 부여
 * @param addAbsoluteStyles 화살표 icon / unit 문자 추가 스타일 부여
 * @param addSubTextStyles 추가 설명 텍스트 추가 스타일
 * @param onClick variant==='select' 일 때 click 이벤트
 * @param onChange variant==='text' 일 때 change 이벤트
 */
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
  addStyles,
  addWrapperStyles,
  addAbsoluteStyles,
  addSubTextStyles,
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
        <span className={css(absoluteStyles, addAbsoluteStyles)}>
          {variant === 'select' && hasDownArrow && <DownArrowIcon />}
          {unit}
        </span>
      </div>
      <span className={css(subTextStyles, addSubTextStyles)}>{subText}</span>
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
    alignItems: 'center',
    width: '100%',
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