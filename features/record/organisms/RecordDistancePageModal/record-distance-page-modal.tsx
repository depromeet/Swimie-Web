'use client';

import './page-modal.css';

import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { HeaderBar } from '@/components/atoms';
import { TextField, UseTab } from '@/components/molecules';
import Tab from '@/components/molecules/Tab/Tab';
import { TabItem } from '@/components/molecules/Tab/TabItem';
import { css } from '@/styled-system/css';

import { AddField } from './add-field';
import { strokeOptions } from './options';
import { RecordSwimField } from './record-swim-field';
import { RecordDistancePageModalProps } from './type';

export function RecordDistancePageModal({
  currentLane,
  modifyTotalMeters,
  modifyTotalLaps,
  modifyStrokes,
  isOpen,
  jumpDirection,
  closePageModal,
}: RecordDistancePageModalProps) {
  const [totalMeters, setTotalMeters] = useState<number>(0);
  const [totalLaps, setTotalLaps] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  console.log(modifyStrokes);

  const { tabIndex: secondaryTabIndex, handlers: secondaryHandlers } = UseTab();
  const { tabIndex: assistiveTabIndex, handlers: assistiveHandlers } = UseTab();

  const handleTotalMetersChange = (text: string) => {
    setTotalLaps(0);
    setTotalMeters(Number(text));
  };
  const handleTotalLapsChange = (text: string) => {
    setTotalMeters(0);
    setTotalLaps(Number(text));
  };
  const handleBackArrowClick = () => {
    if (assistiveTabIndex === 0) {
      modifyTotalMeters(totalMeters);
    } else if (assistiveTabIndex === 1) {
      modifyTotalLaps(totalLaps);
      modifyTotalMeters(totalLaps * currentLane);
    }
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
        <HeaderBar backArrowClick={handleBackArrowClick} />{' '}
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
        <section className={css(recordSectionStyles)}>
          {secondaryTabIndex === 0 && assistiveTabIndex === 0 && (
            <TextField
              inputType="number"
              subText={`${currentLane}m 레인 기준`}
              value={totalMeters === 0 ? '' : String(totalMeters)}
              unit="미터(m)"
              addWrapperStyles={css.raw({ marginTop: '30px' })}
              onChange={handleTotalMetersChange}
            />
          )}
          {secondaryTabIndex === 0 && assistiveTabIndex === 1 && (
            <TextField
              inputType="number"
              subText={`${currentLane}m 레인 기준`}
              value={totalLaps === 0 ? '' : String(totalLaps)}
              unit="바퀴"
              addWrapperStyles={css.raw({ marginTop: '30px' })}
              onChange={handleTotalLapsChange}
            />
          )}
          {secondaryTabIndex === 1 && (
            <>
              {strokeOptions.map((option) => (
                <RecordSwimField
                  key={option}
                  label={option}
                  assistiveTabIndex={assistiveTabIndex}
                  addStyles={css.raw({ marginBottom: '16px' })}
                />
              ))}
              <AddField text="영법 추가" />
            </>
          )}
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
