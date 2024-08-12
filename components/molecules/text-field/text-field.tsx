'use client';

import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { DownArrowIcon } from '@/components/atoms';
import { css, cva, cx } from '@/styled-system/css';

import { TextFieldWrapper } from './text-field-wrapper';
import { TextFieldProps } from './type';
import { useTextField } from './use-text-field';

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
 * @param registerName input 요소를 구독할 때 사용할 name
 * @param className input태그 추가 스타일
 * @param wrapperClassName text-field-wrapper 컴포넌트 추가 스타일 부여
 * @param absoluteClassName 화살표 icon / unit 문자 추가 스타일 부여
 * @param subTextClassName 추가 설명 텍스트 추가 스타일
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
  registerName,
  className,
  wrapperClassName,
  absoluteClassName,
  subTextClassName,
  onClick,
  onChange,
}: TextFieldProps) {
  const { register } = useFormContext();
  const { focused, isWritten, handlers } = useTextField(value, registerName);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    onChange?.(newText);
  };

  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      changeLabelColor={(variant === 'text' && isWritten) || focused}
      className={wrapperClassName}
    >
      <div className={cx(inputWrapperStyles)}>
        {registerName ? (
          <input
            {...(registerName
              ? register(registerName, {
                  valueAsNumber: inputType === 'number' ? true : false,
                })
              : {})}
            type={inputType}
            placeholder={placeholder}
            onFocus={
              variant === 'text'
                ? () => handlers.onChangeFocus(true)
                : undefined
            }
            onBlur={
              variant === 'text'
                ? () => handlers.onChangeFocus(false)
                : undefined
            }
            className={cx(
              css(
                (variant === 'text' && isWritten) || focused
                  ? inputStyles.raw({ isWritten: true })
                  : inputStyles.raw({ isWritten: false }),
              ),
              className,
            )}
          />
        ) : (
          <input
            readOnly={variant === 'select'}
            type={inputType}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleInputChange}
            onFocus={
              variant === 'text'
                ? () => handlers.onChangeFocus(true)
                : undefined
            }
            onBlur={
              variant === 'text'
                ? () => handlers.onChangeFocus(false)
                : undefined
            }
            className={cx(
              css(
                (variant === 'text' && isWritten) || focused
                  ? inputStyles.raw({ isWritten: true })
                  : inputStyles.raw({ isWritten: false }),
              ),
              className,
            )}
            onClick={onClick}
          />
        )}

        {/* span태그 컴포넌트로 공통 생성 시 수정 */}
        {variant === 'select' && hasDownArrow && (
          <span className={cx(absoluteStyles, absoluteClassName)}>
            {<DownArrowIcon />}
          </span>
        )}
        {unit && (
          <span className={cx(absoluteStyles, absoluteClassName)}>{unit}</span>
        )}
      </div>
      <span className={cx(subTextStyles, subTextClassName)}>{subText}</span>
    </TextFieldWrapper>
  );
}

const inputWrapperStyles = css({
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

const absoluteStyles = css({
  position: 'absolute',
  right: 0,
  textStyle: 'heading4',
  fontWeight: '500',
});

const subTextStyles = css({
  color: 'text.alternative',
  textStyle: 'label1.normal',
  fontWeight: '500',
});
