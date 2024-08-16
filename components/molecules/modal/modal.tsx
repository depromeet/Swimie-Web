import { ReactNode } from 'react';

import { Button, Dim } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: ReactNode;
  button?: {
    text: string;
    onClick: () => void;
  };
  isDim?: boolean;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  button,
  isDim = true,
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={containerStyle}>
        <h1 className={text.titleStyle}>
          {title}
          {description && (
            <span className={text.descriptionStyle}>{description}</span>
          )}
        </h1>
        {children && <div className={bodyStyle}>{children}</div>}
        {button && (
          <Button
            label={button.text}
            onClick={button.onClick}
            size="large"
            variant="outlined"
            buttonType="secondary"
          />
        )}
      </div>
      {isOpen && isDim && <Dim onClick={onClose} zIndex={700} />}
    </>
  );
};

const containerStyle = flex({
  direction: 'column',
  gap: '24px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: 'auto',
  translateX: '-1/2',
  translateY: '-1/2',
  height: 'fit-content',
  maxHeight: '504px',
  boxSizing: 'border-box',
  p: '24px',
  zIndex: 750,
  backgroundColor: 'white',
  borderRadius: '12px',
  w: 'calc(100% - 40px)',
  animation: 'dimFadeIn 0.3s',

  '@media (min-width: 600px)': {
    w: '560px',
  },
});

const text = {
  titleStyle: css({
    textStyle: 'heading4',
    fontWeight: 'bold',
    color: 'text.normal',
    textAlign: 'center',
  }),

  descriptionStyle: css({
    ml: '8px',
    textStyle: 'heading5',
    fontWeight: 'medium',
    color: 'text.placeHolder',
  }),
};

const bodyStyle = css({
  marginTop: '-1px',
  width: '100%',
  backgroundColor: 'white',
});
