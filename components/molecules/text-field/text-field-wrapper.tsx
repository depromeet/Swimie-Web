import { css, cva, cx } from '@/styled-system/css';

import { TextFieldWrapperProps } from './type';

/**
 * text-field 컴포넌트의 라벨 및 세부 디자인을 맡고 있는 wrapper 컴포넌트.
 * @param isRequired 필수 여부
 * @param label 라벨 이름
 * @param changeLabelColor true시 라벨 색깔 변경
 * @param className 레이아웃 추가 스타일
 * @param children 자식 요소
 */
export function TextFieldWrapper({
  isRequired,
  label,
  changeLabelColor = false,
  className,
  children,
}: TextFieldWrapperProps) {
  return (
    <section className={cx(textFieldWrapperStyles, className)}>
      {/* span 컴포넌트 생성시 교체 필요 */}
      <span
        className={css(
          changeLabelColor && labelStyles.raw({ changeLabelColor: true }),
        )}
      >
        {label}
      </span>
      {isRequired && (
        <span className={css({ color: 'status.negative' })}> *</span>
      )}
      {children}
    </section>
  );
}
const textFieldWrapperStyles = css({
  position: 'relative',
});

const labelStyles = cva({
  base: {
    textStyle: 'label1.normal',
    fontWeight: '500',
  },
  variants: {
    changeLabelColor: {
      true: { color: 'blue.60' },
      false: { color: 'text.normal' },
    },
  },
});
