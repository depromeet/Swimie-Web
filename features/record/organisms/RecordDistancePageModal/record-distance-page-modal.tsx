'use client';

import './page-modal.css';

import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { HeaderBar } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { AddField } from './add-field';
import { strokeOptions } from './options';
import { RecordSwimField } from './record-swim-field';
import { RecordDistancePageModalProps } from './type';

export function RecordDistancePageModal({
  isOpen,
  jumpDirection,
  closePageModal,
}: RecordDistancePageModalProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        <HeaderBar backArrowClick={closePageModal} />
        <h1 className={css(titleStyles)}>수영 거리를 입력해주세요</h1>
        <section className={css(recordSwimFieldsStyles)}>
          {strokeOptions.map((option) => (
            <RecordSwimField
              key={option}
              label={option}
              addStyles={css.raw({ marginBottom: '16px' })}
            />
          ))}
          <AddField text="영법 추가" />
        </section>
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

const titleStyles = css.raw({
  marginTop: '24px',
  padding: '0 20px',
});

const recordSwimFieldsStyles = css.raw({
  padding: '20px',
  marginBottom: '16px',
});
