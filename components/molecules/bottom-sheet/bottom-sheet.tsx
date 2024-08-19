import { ReactNode } from 'react';

import { Dim } from '@/components/atoms';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
  isRenderHandlebar?: boolean;
};

export const BottomSheet = ({
  children,
  onClose,
  isOpen,
  header,
  direction = 'bottom',
  className,
  isRenderHandlebar,
}: BottomSheetProps) => {
  const isBottomDirection = direction === 'bottom';
  const bottomSheetStyle = isBottomDirection
    ? {
        bottom: 0,
        borderRadius: '16px 16px 0 0',
      }
    : {
        top: 0,
        borderRadius: '0 0 16px 16px',
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
        {isRenderHandlebar && (
          <div className={handleBarStyle({ direction: direction })} />
        )}

        {header && (
          <div className={headerStyle.wrapper}>
            <h1 className={headerStyle.title}>{header.title}</h1>
            {header.description && (
              <p className={headerStyle.description}>{header.description}</p>
            )}
          </div>
        )}

        <div className={bodyStyle}>{children}</div>
      </div>

      {isOpen && <Dim onClick={onClose} zIndex={500} />}
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
  zIndex: 550,
  boxSizing: 'border-box',
  width: '100%',
  overflow: 'hidden',
  transition: 'transform 400ms cubic-bezier(0.33, 0.45, 0, 1)',
  willChange: 'transform',
  WebkitOverflowScrolling: 'touch',
  backgroundColor: 'white',
  pt: '28px',
  pb: '36px',
});

const handleBarStyle = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    mx: 'auto',
    width: '48px',
    height: '4px',
    backgroundColor: '#E5E8EB',
  },
  variants: {
    direction: {
      top: { bottom: '12px' },
      bottom: { top: '12px' },
    },
  },
});

const headerStyle = {
  wrapper: css({
    padding: '12px 20px',
  }),

  title: css({
    textStyle: 'heading4',
    fontWeight: 'bold',
    color: 'text.normal',
  }),

  description: css({
    textStyle: 'body2.normal',
    fontWeight: 'medium',
    color: 'text.alternative',
    mt: '4px',
  }),
};

const bodyStyle = flex({
  direction: 'column',
  marginTop: '-1px',
  width: '100%',
  backgroundColor: 'white',
});
