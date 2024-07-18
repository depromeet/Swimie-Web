'use client';

import './page-modal.css';

import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { HeaderBar } from '@/components/atoms';
import { UseTab } from '@/components/molecules';
import Tab from '@/components/molecules/Tab/Tab';
import { TabItem } from '@/components/molecules/Tab/TabItem';
import { InputTextField } from '@/components/molecules/TextField/input-text-field';
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
  const { tabIndex: secondaryTabIndex, handlers: secondaryHandlers } = UseTab();
  const { tabIndex: assistiveTabIndex, handlers: assistiveHandlers } = UseTab();

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
        <HeaderBar backArrowClick={closePageModal} />{' '}
        <h1 className={css(titleStyles)}>수영 거리 입력</h1>
        <section className={css(tabSectionStyles)}>
          <Tab type="secondary" addStyles={css.raw({ marginBottom: '12px' })}>
            <TabItem
              type="secondary"
              text="총거리"
              selected={secondaryTabIndex === 0}
              onClick={() => secondaryHandlers.changeTabIndex(0)}
            />
            <TabItem
              type="secondary"
              text="영법별 거리"
              selected={secondaryTabIndex === 1}
              onClick={() => secondaryHandlers.changeTabIndex(1)}
            />
          </Tab>
          <Tab type="assistive">
            <TabItem
              type="assistive"
              text="미터(m)"
              selected={assistiveTabIndex === 0}
              onClick={() => assistiveHandlers.changeTabIndex(0)}
            />
            <TabItem
              type="assistive"
              text="바퀴수"
              selected={assistiveTabIndex === 1}
              onClick={() => assistiveHandlers.changeTabIndex(1)}
            />
          </Tab>
        </section>
        {secondaryTabIndex === 0 && (
          <section className={css(recordSectionStyles)}>
            <InputTextField unit="m" />
          </section>
        )}
        {secondaryTabIndex === 1 && (
          <section className={css(recordSectionStyles)}>
            {strokeOptions.map((option) => (
              <RecordSwimField
                key={option}
                label={option}
                addStyles={css.raw({ marginBottom: '16px' })}
              />
            ))}
            <AddField text="영법 추가" />
          </section>
        )}
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
  paddingLeft: '20px',
});

const tabSectionStyles = css.raw({
  marginTop: '16px',
  padding: '0 20px',
});

const recordSectionStyles = css.raw({
  padding: '20px',
  marginBottom: '16px',
});
