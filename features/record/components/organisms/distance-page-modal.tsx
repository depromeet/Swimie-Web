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

export default function DistancePageModal() {
  const { setValue } = useFormContext();
  const pageModalState = useAtomValue(isDistancePageModalOpen);
  const {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalDistance,
    unit,
    handlers,
  } = useDistancePageModal<HTMLDivElement>();
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
    totalDistance && setValue('totalDistance', totalDistance);
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
          <TextField
            inputType="number"
            subText={
              assistiveTabIndex === 1
                ? '레인 길이에 따라 자동으로 거리를 계산해드릴게요'
                : undefined
            }
            value={totalDistance}
            unit={unit}
            wrapperClassName={css({ marginTop: '30px' })}
            onChange={handlers.onChangeTotalDistance}
          />
        </section>
        <div className={layout.button}>
          <Button
            size="large"
            label="완료"
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
    padding: '20px',
    marginBottom: '16px',
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
