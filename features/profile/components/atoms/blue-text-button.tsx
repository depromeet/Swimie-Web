'use client';

import { css } from '@/styled-system/css';

interface BlueTextButtonProps {
  label: string;
  onClick?: () => void;
}

export function BlueTextButton({ label, onClick }: BlueTextButtonProps) {
  const handleButtonClick = () => {
    onClick?.();
  };

  return (
    <button className={layout} onClick={handleButtonClick}>
      {label}
    </button>
  );
}

const layout = css({
  color: 'primary.swim.총거리.default',
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  mr: '8px',
});
