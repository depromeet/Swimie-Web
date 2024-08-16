'use client';

import { forwardRef } from 'react';

import { cx } from '@/styled-system/css';

import { layoutStyles } from './style';
import { FormTextAreaProps } from './type';

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ placeholder, className, onChange, name }, ref) => {
    return (
      <textarea
        placeholder={placeholder}
        className={cx(layoutStyles, className)}
        onChange={onChange}
        ref={ref}
        name={name}
      />
    );
  },
);

FormTextArea.displayName = 'FormTextArea';
