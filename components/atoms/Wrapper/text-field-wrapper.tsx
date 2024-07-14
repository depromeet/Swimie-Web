import { css } from '@/styled-system/css';

import { TextFieldWrapperProps } from './type';

export function TextFieldWrapper({
  isRequired,
  label,
  addStyles,
  children,
}: TextFieldWrapperProps) {
  return (
    <section className={css(addStyles)}>
      <span>{label}</span>
      {isRequired && <span className={css({ color: 'red' })}> *</span>}
      {children}
    </section>
  );
}
