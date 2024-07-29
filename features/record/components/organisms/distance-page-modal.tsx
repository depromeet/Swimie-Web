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
    handlers,
  } = useDistancePageModal<HTMLDivElement>(getValues('lane') as number);

  const isAssistiveIndexZero = assistiveTabIndex === 0;
  const isAssistiveIndexOne = assistiveTabIndex === 1;

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
      selected: isAssistiveIndexZero,
      onClick: () => handlers.onChangeAssistiveTabIndex(0),
    },
    {
      text: '바퀴수',
      selected: isAssistiveIndexOne,
      onClick: () => handlers.onChangeAssistiveTabIndex(1),
    },
  ];

  const handleBackArrowClick = () => {
    handlers.onClosePageModal();
  };
  const handleDoneButtonClick = () => {
    if (isAssistiveIndexZero) setValue('totalDistance', Number(totalMeter));
    else if (isAssistiveIndexOne)
      setValue('totalDistance', Number(totalDistance));
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
                isAssistiveIndexOne
                  ? '레인 길이에 따라 자동으로 거리를 계산해드릴게요'
                  : undefined
              }
              value={isAssistiveIndexZero ? totalMeter : totalLaps}
              unit={isAssistiveIndexZero ? '미터(m)' : '바퀴'}
              wrapperClassName={css({ marginTop: '16px' })}
              onChange={
                isAssistiveIndexZero
                  ? handlers.onChangeTotalMeter
                  : handlers.onChangeTotalLaps
              }
            />
          )}
          {secondaryTabIndex === 1 && (
            <StrokeDistanceFields assistiveTabIndex={assistiveTabIndex} />
          )}
        </section>
        <div className={layout.button}>
          <Button
            size="large"
            label={
              isAssistiveIndexZero
                ? '완료'
                : `${totalLaps && Number(totalLaps) * getValues('lane') + 'm'} 완료`
            }
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
