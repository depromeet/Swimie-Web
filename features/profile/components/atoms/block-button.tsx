import { css } from '@/styled-system/css';

interface BlockButtonProps {
  onClick: () => void;
}

export function BlockButton({ onClick }: BlockButtonProps) {
  return (
    <button onClick={onClick} className={css({ cursor: 'pointer' })}>
      차단
    </button>
  );
}
