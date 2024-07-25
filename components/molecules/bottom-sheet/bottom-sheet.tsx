import { ReactNode } from 'react';

import { Dim } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

type Direction = 'top' | 'bottom';

/**
 * @param header bottomSheet의 title, description이 포함된 header 영역
 * @param isOpen open state
 * @param onClose close function
 * @param children bottom sheet 내부 자식 요소
 * @param direction bottom sheet direction (bottom or top, default: bottom)
 */
export type BottomSheetProps = {
  header?: {
    title: string;
    description?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  direction?: Direction;
  className?: string;
};

export const BottomSheet = ({
  children,
  onClose,
  isOpen,
  header,
  direction = 'bottom',
  className,
}: BottomSheetProps) => {
  const isBottomDirection = direction === 'bottom';
  const bottomSheetStyle = isBottomDirection
    ? {
        bottom: 0,
        borderRadius: '20px 20px 0 0',
      }
    : {
        top: 0,
        borderRadius: '0 0 20px 20px',
      };

  return (
    <>
      <div
        className={cx(containerStyle, className)}
        style={{
          ...bottomSheetStyle,
          transform: getTranslateY(direction, isOpen),
        }}
      >
        {/* TODO: title style */}
        {header && (
          <div className={titleWrapperStyle}>
            <h1>{header.title}</h1>
            {header.description && <p>{header.description}</p>}
          </div>
        )}

        <div className={bodyStyle}>{children}</div>
      </div>

      {isOpen && <Dim onClick={onClose} />}
    </>
  );
};

const getTranslateY = (direction: Direction, isOpen: boolean) => {
  switch (direction) {
    case 'top':
      return `${isOpen ? 'translateY(0)' : 'translateY(-110vh)'}`;
    case 'bottom':
      return `${isOpen ? 'translateY(0)' : 'translateY(110vh)'}`;
    default:
      return '';
  }
};

const containerStyle = css({
  maxWidth: 'maxWidth',
  margin: '0 auto',
  height: 'auto',
  position: 'fixed',
  right: 0,
  left: 0,
  zIndex: 1000,
  boxSizing: 'border-box',
  width: '100%',
  overflow: 'hidden',
  transition: 'transform 400ms cubic-bezier(0.33, 0.45, 0, 1)',
  willChange: 'transform',
  WebkitOverflowScrolling: 'touch',
});

const bodyStyle = css({
  display: 'flex',
  direction: 'column',
  marginTop: '-1px',
  width: '100%',
  backgroundColor: 'white',
});

const titleWrapperStyle = css({
  padding: '16px',
  textAlign: 'center',
  backgroundColor: 'white',
});
