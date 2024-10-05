import { css } from '@/styled-system/css';

interface SkipButtonProps {
  label: string;
  onClick: () => void;
}

export function SkipButton({ label, onClick }: SkipButtonProps) {
  return (
    <button onClick={onClick} className={skipButtonStyles}>
      {label}
    </button>
  );
}

const skipButtonStyles = css({
  textStyle: 'label1.normal',
  color: 'text.alternative',
  fontWeight: 500,
});
