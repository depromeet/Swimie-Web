import { ChangeEvent } from 'react';

import { css, cx } from '@/styled-system/css';

export interface TextAreaProps {
  value: string;
  placeholder: string;
  className?: string;
  onChange?: (text: string) => void;
}

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
      className={cx(textAreaStyles, className)}
      onChange={handleTextAreaChange}
    />
  );
}

const textAreaStyles = css({
  width: '100%',
  height: '135px',
  padding: '16px 12px',
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'line.normal',
  outline: 'none',
  textStyle: 'body2.normal',
  fontWeight: 500,
});
