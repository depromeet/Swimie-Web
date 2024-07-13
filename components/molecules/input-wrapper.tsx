import { ReactNode } from 'react';

import { InputProps } from '@/components/atoms';

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
