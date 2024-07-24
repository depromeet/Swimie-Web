'use client';

import './page-modal.css';

import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Button } from '@/components/atoms';
import {
  HeaderBar,
  Tab,
  TabItem,
  TextField,
  useTab,
} from '@/components/molecules';
import { css } from '@/styled-system/css';

import { strokeOptions } from './options';
import { StrokeDistanceField } from './stroke-distance-field';
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
  const [strokes, setStrokes] = useState(
    Array.from({ length: strokeOptions.length }, (_, i) => ({
      name: strokeOptions[i],
      laps: 0,
      meter: 0,
    })),
  );
  const [isStrokesMeterModified, setIsStrokesMeterModified] = useState(false);
  const [isStrokesLapsModified, setIsStrokesLapsModified] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { tabIndex: secondaryTabIndex, handlers: secondaryHandlers } = useTab();
  const { tabIndex: assistiveTabIndex, handlers: assistiveHandlers } = useTab();

  const resetTotalMeters = () => {
    if (totalMeters) setTotalMeters(0);
  };
  const resetTotalLaps = () => {
    if (totalLaps) setTotalLaps(0);
  };
  const resetStrokes = () => {
    if (isStrokesMeterModified || isStrokesLapsModified) {
      setStrokes(
        Array.from({ length: strokeOptions.length }, (_, i) => ({
          name: strokeOptions[i],
          laps: 0,
          meter: 0,
        })),
      );
    }
    if (isStrokesMeterModified) setIsStrokesMeterModified(false);
    if (isStrokesLapsModified) setIsStrokesLapsModified(false);
  };
  const resetStrokesMeter = () => {
    if (isStrokesMeterModified) {
      setStrokes((prev) =>
        prev.map((stroke) => ({
          ...stroke,
          meter: 0,
        })),
      );
    }
    setIsStrokesMeterModified(false);
  };
  const resetStrokesLaps = () => {
    if (isStrokesLapsModified) {
      setStrokes((prev) =>
        prev.map((stroke) => ({
          ...stroke,
          laps: 0,
        })),
      );
    }
    setIsStrokesLapsModified(false);
  };
  const handleTotalMetersChange = (text: string) => {
    resetStrokes();
    resetTotalLaps();
    setTotalMeters(Number(text));
  };
  const handleTotalLapsChange = (text: string) => {
    resetStrokes();
    resetTotalMeters();
    setTotalLaps(Number(text));
  };
  const handleStrokeInfoChange = (index: number, text: string) => {
    resetTotalLaps();
    resetTotalMeters();
    if (assistiveTabIndex === 0) {
      if (!isStrokesMeterModified) setIsStrokesMeterModified(true);
      resetStrokesLaps();
      setStrokes((prev) => {
        const copyStrokes = [...prev];
        copyStrokes[index] = {
          ...copyStrokes[index],
          meter: Number(text),
        };

        return copyStrokes;
      });
    } else if (assistiveTabIndex === 1) {
      if (!isStrokesLapsModified) setIsStrokesLapsModified(true);
      resetStrokesMeter();
      setStrokes((prev) => {
        const copyStrokes = [...prev];
        copyStrokes[index] = {
          ...copyStrokes[index],
          laps: Number(text),
        };

        return copyStrokes;
      });
    }
  };
  const calcStrokesMeter = () => {
    let strokeMeter = 0;
    for (const info of strokes) {
      strokeMeter += isStrokesMeterModified
        ? info.meter
        : info.laps * currentLane;
    }
    return strokeMeter;
  };
  const handleDoneButtonClick = () => {
    if (totalMeters) {
      modifyTotalMeters(totalMeters);
    } else if (totalLaps) {
      modifyTotalMeters(totalLaps * currentLane);
      modifyTotalLaps(totalLaps);
    } else if (isStrokesMeterModified || isStrokesLapsModified) {
      modifyTotalMeters(calcStrokesMeter());
      modifyStrokes(strokes);
    }
    closePageModal?.();
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
      <div className={RecordDistancePageModalStyles} ref={ref}>
        <HeaderBar onClickBackArrow={closePageModal} />
        <h1 className={titleStyles}>수영 거리 입력</h1>
        <section className={tabSectionStyles}>
          <Tab type="secondary" className={css({ marginBottom: '12px' })}>
            <TabItem
              type="secondary"
              text="총거리"
              selected={secondaryTabIndex === 0}
              onClick={() => secondaryHandlers.onChangeTabIndex(0)}
            />
            <TabItem
              type="secondary"
              text="영법별 거리"
              selected={secondaryTabIndex === 1}
              onClick={() => secondaryHandlers.onChangeTabIndex(1)}
            />
          </Tab>
          <Tab type="assistive">
            <TabItem
              type="assistive"
              text="미터(m)"
              selected={assistiveTabIndex === 0}
              onClick={() => assistiveHandlers.onChangeTabIndex(0)}
            />
            <TabItem
              type="assistive"
              text="바퀴수"
              selected={assistiveTabIndex === 1}
              onClick={() => assistiveHandlers.onChangeTabIndex(1)}
            />
          </Tab>
        </section>
        <section className={recordSectionStyles}>
          {secondaryTabIndex === 0 && assistiveTabIndex === 0 && (
            <TextField
              inputType="number"
              subText={`${currentLane}m 레인 기준`}
              value={totalMeters === 0 ? '' : String(totalMeters)}
              unit="미터(m)"
              wrapperClassName={css({ marginTop: '30px' })}
              onChange={handleTotalMetersChange}
            />
          )}
          {secondaryTabIndex === 0 && assistiveTabIndex === 1 && (
            <TextField
              inputType="number"
              subText={`${currentLane}m 레인 기준`}
              value={totalLaps === 0 ? '' : String(totalLaps)}
              unit="바퀴"
              wrapperClassName={css({ marginTop: '30px' })}
              onChange={handleTotalLapsChange}
            />
          )}
          {secondaryTabIndex === 1 && (
            <>
              {strokeOptions.map((option, i) => (
                <StrokeDistanceField
                  key={option}
                  label={option}
                  assistiveTabIndex={assistiveTabIndex}
                  index={i}
                  value={
                    assistiveTabIndex === 0
                      ? String(strokes[i].meter)
                      : String(strokes[i].laps)
                  }
                  onChange={handleStrokeInfoChange}
                  className={css({ marginBottom: '16px' })}
                />
              ))}
            </>
          )}
        </section>
        <div className={buttonStyles} onClick={handleDoneButtonClick}>
          <Button
            size="large"
            label="완료"
            interaction="normal"
            className={css({ width: '100%' })}
          />
        </div>
      </div>
    </CSSTransition>
  );
}

const RecordDistancePageModalStyles = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
});

const titleStyles = css({
  marginTop: '24px',
  paddingLeft: '20px',
});

const tabSectionStyles = css({
  marginTop: '16px',
  padding: '0 20px',
});

const recordSectionStyles = css({
  padding: '20px',
  marginBottom: '16px',
});

const buttonStyles = css({
  width: '100%',
  position: 'absolute',
  bottom: '15px',
  padding: '0 20px',
});
