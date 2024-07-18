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
    <section className={css(addStyles)}>
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

const labelStyles = cva({
  base: {},
  variants: {
    changeLabelColor: {
      true: { color: 'blue.60' },
    },
  },
});
