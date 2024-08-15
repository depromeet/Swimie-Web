'use client';

import { ChangeEvent } from 'react';

import { css, cx } from '@/styled-system/css';

import { TextAreaProps } from './type';

export function TextArea({
  value,
  placeholder,
  className,
  onChange,
}: TextAreaProps) {
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onChange?.(newText);
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className={cx(layoutStyles, className)}
      onChange={handleTextAreaChange}
    />
  );
}

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
