'use client';

import './page-modal.css';

import { css } from '@/styled-system/css';

import { RecordDistancePageModalProps } from './type';

export function RecordDistancePageModal({
  closePageModal,
}: RecordDistancePageModalProps) {
  const handleDoneButtonClick = () => {
    closePageModal && closePageModal();
  };
  return (
    <div className={css(RecordDistancePageModalStyles)}>
      <h1 className={css({ marginTop: '24px' })}>거리 입력 페이지 모달</h1>
      <div className={css(buttonStyles)} onClick={handleDoneButtonClick}>
        거리 입력 완료
      </div>
    </div>
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
