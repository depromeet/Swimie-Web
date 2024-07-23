import { css } from '@/styled-system/css';

export interface TextAreaProps {
  placeholder: string;
  className?: string;
}

export function TextArea({ placeholder }: TextAreaProps) {
  return (
    <textarea placeholder={placeholder} className={textAreaStyles}></textarea>
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
