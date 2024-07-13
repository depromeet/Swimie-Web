import { ReactNode } from 'react';

import { InputProps } from '@/components/atoms';

interface InputWrapperProps extends Pick<InputProps, 'isRequired' | 'label'> {
  children: ReactNode;
}

export function InputWrapper({
  isRequired,
  label,
  children,
}: InputWrapperProps) {
  return (
    <section>
      <span>{label}</span>
      {isRequired && <span>*</span>}
      {children}
    </section>
  );
}
