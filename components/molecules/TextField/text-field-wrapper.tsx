import { css, cva } from '@/styled-system/css';

import { TextFieldWrapperProps } from './type';

export function TextFieldWrapper({
  isRequired,
  label,
  changeLabelColor = false,
  addStyles,
  children,
}: TextFieldWrapperProps) {
  return (
    <section className={css(textFieldWrapperStyles, addStyles)}>
      {/* span 컴포넌트 생성시 교체 필요 */}
      <span
        className={css(
          changeLabelColor && labelStyles.raw({ changeLabelColor: true }),
        )}
      >
        {label}
      </span>
      {isRequired && (
        <span className={css({ color: 'status.destructive' })}> *</span>
      )}
      {children}
    </section>
  );
}
const textFieldWrapperStyles = css.raw({
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
