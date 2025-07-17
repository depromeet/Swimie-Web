import { ReactNode } from 'react';

import { Button, Dim } from '@/components/atoms';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  button?: {
    text: string;
    onClick: () => void;
  };
  isDim?: boolean;
  isBodyFadeOut?: boolean;
  content?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  button,
  isDim = true,
  isBodyFadeOut,
  content = '',
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
        {children && (
          <div className={bodyStyle({ isBodyFadeOut: Boolean(isBodyFadeOut) })}>
            {children}
          </div>
        )}
        {content && <span>{content}</span>}
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

const bodyStyle = cva({
  base: {
    position: 'relative',
    marginTop: '-1px',
    width: '100%',
    height: 'max-content',
    maxHeight: '332px',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  variants: {
    isBodyFadeOut: {
      true: {
        '&:after': {
          position: 'absolute',
          bottom: 0,
          content: "''",
          width: 'full',
          height: '40px',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
        },
      },
    },
  },
});
