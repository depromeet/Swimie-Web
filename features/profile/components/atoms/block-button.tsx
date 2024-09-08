import { css } from '@/styled-system/css';

interface BlockButtonProps {
  onClick: () => void;
}

export function BlockButton({ onClick }: BlockButtonProps) {
  return (
    <button onClick={onClick} className={blockButtonStyles}>
      차단
    </button>
  );
}

const blockButtonStyles = css({
  textStyle: 'body2.normal',
  fontWeight: '500',
  color: 'text.normal',
  cursor: 'pointer',
});
