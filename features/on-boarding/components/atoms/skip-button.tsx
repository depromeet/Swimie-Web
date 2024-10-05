import { css } from '@/styled-system/css';

interface SkipButtonProps {
  label: string;
}

export function SkipButton({ label }: SkipButtonProps) {
  return <button className={skipButtonStyles}>{label}</button>;
}

const skipButtonStyles = css({
  textStyle: 'label1.normal',
  color: 'text.alternative',
  fontWeight: 500,
});
