'use client';

import './page-modal.css';

import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { css } from '@/styled-system/css';

import { RecordDistancePageModalProps } from './type';

export function RecordDistancePageModal({
  isOpen,
  jumpDirection,
  closePageModal,
}: RecordDistancePageModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleDoneButtonClick = () => {
    closePageModal && closePageModal();
  };
  return (
    <CSSTransition
      nodeRef={ref}
      classNames={`record-distance-jump-${jumpDirection}`}
      timeout={300}
      in={isOpen}
      mountOnEnter
      unmountOnExit
    >
      <div className={css(RecordDistancePageModalStyles)} ref={ref}>
        <h1 className={css({ marginTop: '24px' })}>거리 입력 페이지 모달</h1>
        <div className={css(buttonStyles)} onClick={handleDoneButtonClick}>
          거리 입력 완료
        </div>
      </div>
    </CSSTransition>
  );
}

const RecordDistancePageModalStyles = css.raw({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
});

const buttonStyles = css.raw({
  width: '130px',
  height: '50px',
  backgroundColor: 'skyblue',
  borderRadius: '4px',
});
