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
    //span 컴포넌트 생성시 교체 필요
    <section className={css(textFieldWrapperStyles, addStyles)}>
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
  variants: {
    changeLabelColor: {
      true: { color: 'blue.60' },
      false: { color: 'text.normal' },
    },
  },
});
