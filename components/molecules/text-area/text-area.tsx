import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { css, cx } from '@/styled-system/css';

export interface TextAreaProps {
  registerName?: string;
  value?: string;
  placeholder: string;
  className?: string;
  onChange?: (text: string) => void;
}

export function TextArea({
  registerName,
  value,
  placeholder,
  className,
  onChange,
}: TextAreaProps) {
  const { register } = useFormContext();
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onChange?.(newText);
  };

  return registerName ? (
    <textarea
      {...register(registerName)}
      placeholder={placeholder}
      className={cx(layoutStyles, className)}
    />
  ) : (
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
