import { ButtonHTMLAttributes } from 'react';

import { CheckInCircleIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface ViewImagehButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export const ViewImageButton = ({
  isActive,
  ...props
}: ViewImagehButtonProps) => {
  return (
    <button
      {...props}
      className={flex({
        gap: '4px',
        alignItems: 'center',
        justifyContent: 'center',
        textStyle: 'label2',
        fontWeight: 'medium',
        color: isActive ? 'primary.swim.총거리.default' : 'text.alternative',

        '& > p': { height: '18px' },
      })}
    >
      <CheckInCircleIcon
        isActive={isActive}
        className={css({ cursor: 'pointer' })}
      />
      <p>사진 보기</p>
    </button>
  );
};
