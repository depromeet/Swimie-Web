'use client';

import { useAtomValue } from 'jotai';
import { PropsWithChildren, ReactNode } from 'react';

import { toastAtom } from '@/store';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { Error, Success, Warning } from '../icons';

export type ToastType = 'success' | 'error' | 'warning';
export type ToastProps = {
  content: ReactNode;
  type: ToastType;
};

export const ToastDialog = () => {
  const toastState = useAtomValue(toastAtom);
  const isOpen = toastState.size > 0;

  return (
    <dialog
      className={containerStyle}
      open={isOpen}
      ref={(el) => {
        if (el && !el.open) el.show();
      }}
    >
      <div className={toastWrapperStyle}>
        {Array.from(toastState.entries()).map(([id, { content, type }]) => (
          <Toast type={type} key={id}>
            {content}
          </Toast>
        ))}
      </div>
    </dialog>
  );
};

const Toast = ({
  type,
  children,
}: PropsWithChildren<{
  type: ToastType;
}>) => {
  return (
    <div className={toastStyle}>
      {
        {
          success: <Success />,
          error: <Error />,
          warning: <Warning />,
        }[type]
      }
      {children}
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  backgroundColor: 'transparent',
});

const toastWrapperStyle = flex({
  direction: 'column',
  gap: '4px',
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: 'calc(35px + env(safe-area-inset-bottom))',
  zIndex: 200,
});

const toastStyle = flex({
  textWrap: 'nowrap',
  alignItems: 'center',
  gap: '10px',
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  color: 'white',
  p: '12px 16px',
  backgroundColor: 'fill.highlight',
  rounded: '16px',
  animation: 'fadeUp 0.3s',
});
