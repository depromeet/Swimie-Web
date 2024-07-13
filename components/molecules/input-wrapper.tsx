import { ReactNode } from 'react';

import { InputProps } from '../atoms/input/type';

interface InputWrapperProps extends Pick<InputProps, 'label'> {
  children: ReactNode;
}

export function InputWrapper({ label, children }: InputWrapperProps) {
  return (
    <section>
      <span>{label}</span>
      {children}
    </section>
  );
}
