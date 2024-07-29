'use client';

import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';
import {
  HeaderBar,
  PageModal,
  Tab,
  TabItem,
  TextField,
} from '@/components/molecules';
import { css } from '@/styled-system/css';

import { useDistancePageModal } from '../../hooks';
import { isDistancePageModalOpen } from '../../store';
import { StrokeDistanceFields } from './stroke-distance-fields';

// Todo: 영법별 거리 입력 로직 구현
export function DistancePageModal() {
  const { getValues, setValue } = useFormContext();
  const pageModalState = useAtomValue(isDistancePageModalOpen);
  const {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalMeter,
    totalLaps,
    totalDistance,
    strokeMeterTotalDistance,
    strokeLapsTotalDistance,
    strokes,
    buttonLabel,
    handlers,
  } = useDistancePageModal<HTMLDivElement>(getValues('lane') as number);
  const secondaryTabItems = [
    {
      text: '총거리',
      selected: secondaryTabIndex === 0,
      onClick: () => handlers.onChangeSecondaryTabIndex(0),
    },
    {
      text: '영법별 거리',
      selected: secondaryTabIndex === 1,
      onClick: () => handlers.onChangeSecondaryTabIndex(1),
    },
  ];
  const assistiveTabItems = [
    {
      text: '미터(m)',
      selected: assistiveTabIndex === 0,
      onClick: () => handlers.onChangeAssistiveTabIndex(0),
    },
    {
      text: '바퀴수',
      selected: assistiveTabIndex === 1,
      onClick: () => handlers.onChangeAssistiveTabIndex(1),
    },
  ];

  const handleBackArrowClick = () => {
    handlers.onClosePageModal();
  };
  const handleDoneButtonClick = () => {
    if (secondaryTabIndex === 0) {
      if (assistiveTabIndex === 0) setValue('totalDistance', totalMeter);
      else if (assistiveTabIndex === 1)
        setValue('totalDistance', totalDistance);
    } else {
      if (assistiveTabIndex === 0)
        setValue('totalDistance', strokeMeterTotalDistance);
      else if (assistiveTabIndex === 1)
        setValue('totalDistance', strokeLapsTotalDistance);
    }
    handlers.onClosePageModal();
  };
  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div ref={pageModalRef}>
        <HeaderBar onClickBackArrow={handleBackArrowClick} />
        <h1 className={titleStyles}>수영 거리를 입력해주세요</h1>
        <section className={layout.tab}>
          <Tab type="secondary" className={css({ marginBottom: '12px' })}>
            {secondaryTabItems.map((tabItem) => (
              <TabItem
                key={tabItem.text + secondaryTabIndex}
                type="secondary"
                {...tabItem}
              />
            ))}
          </Tab>
          <Tab type="assistive">
            {assistiveTabItems.map((tabItem) => (
              <TabItem
                key={tabItem.text + assistiveTabIndex}
                type="assistive"
                {...tabItem}
              />
            ))}
          </Tab>
        </section>
        <section className={layout.record}>
          {secondaryTabIndex === 0 && (
            <TextField
              inputType="number"
              subText={
                assistiveTabIndex === 1
                  ? '레인 길이에 따라 자동으로 거리를 계산해드릴게요'
                  : undefined
              }
              value={assistiveTabIndex === 0 ? totalMeter : totalLaps}
              unit={assistiveTabIndex === 0 ? '미터(m)' : '바퀴'}
              wrapperClassName={css({ marginTop: '16px' })}
              onChange={
                assistiveTabIndex === 0
                  ? handlers.onChangeTotalMeter
                  : handlers.onChangeTotalLaps
              }
            />
          )}
          {secondaryTabIndex === 1 && (
            <StrokeDistanceFields
              assistiveTabIndex={assistiveTabIndex}
              strokes={strokes}
              onChangeStroke={handlers.onChangeStroke}
            />
          )}
        </section>
        <div className={layout.button}>
          <Button
            size="large"
            label={buttonLabel()}
            interaction="normal"
            onClick={handleDoneButtonClick}
            className={css({ w: 'full' })}
          />
        </div>
      </div>
    </PageModal>
  );
}

const layout = {
  tab: css({
    width: '100%',
    marginTop: '16px',
    padding: '0 20px',
  }),

  record: css({
    padding: '0 20px',
  }),

  button: css({
    w: 'full',
    position: 'absolute',
    bottom: '15px',
    padding: '0 20px',
  }),
};

const titleStyles = css({
  marginTop: '24px',
  paddingLeft: '20px',
  textStyle: 'heading3',
  fontWeight: 600,
});
