'use client';

import { forwardRef } from 'react';

import { css, cx } from '@/styled-system/css';

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

const layoutStyles = css({
  w: '100%',
  h: '135px',
  padding: '16px 12px',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'line.normal',
  outline: 'none',
  textStyle: 'body2.normal',
  fontWeight: 500,
});
