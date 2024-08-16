'use client';

import { ChangeEvent } from 'react';

import { cx } from '@/styled-system/css';

import { layoutStyles } from './style';
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
