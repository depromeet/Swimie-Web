'use client';

import { useAtom } from 'jotai';
import { useRef } from 'react';

import { Button } from '@/components/atoms';
import {
  HeaderBar,
  PageModal,
  Tab,
  TabItem,
  TextField,
} from '@/components/molecules';
import { css } from '@/styled-system/css';

import { isDistancePageModalOpen } from '../../store';

interface RecordDistancePageModalProps {
  currentLane: number;
}

export default function DistancePageModal({
  currentLane,
}: RecordDistancePageModalProps) {
  const pageModalRef = useRef<HTMLDivElement>(null);
  const [pageModalState, setPageModalState] = useAtom(isDistancePageModalOpen);

  const handleBackArrowClick = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };
  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div className={layout.content} ref={pageModalRef}>
        <HeaderBar onClickBackArrow={handleBackArrowClick} />
        <h1 className={titleStyles}>수영 거리를 입력해주세요</h1>
        <section className={layout.tab}>
          <Tab type="secondary" className={css({ marginBottom: '12px' })}>
            <TabItem
              type="secondary"
              text="총거리"
              selected
              onClick={() => console.log('TabItem')}
            />
            <TabItem
              type="secondary"
              text="영법별 거리"
              selected={false}
              onClick={() => console.log('TabItem')}
            />
          </Tab>
          <Tab type="assistive">
            <TabItem
              type="assistive"
              text="미터(m)"
              selected
              onClick={() => console.log('TabItem')}
            />
            <TabItem
              type="assistive"
              text="바퀴수"
              selected={false}
              onClick={() => console.log('TabItem')}
            />
          </Tab>
        </section>
        <section className={layout.record}>
          <TextField
            inputType="number"
            subText={`${currentLane}m 레인 기준`}
            value=""
            unit="미터(m)"
            wrapperClassName={css({ marginTop: '30px' })}
          />
        </section>
        <div className={layout.button}>
          <Button size="large" label="완료" interaction="normal" />
        </div>
      </div>
    </PageModal>
  );
}

const layout = {
  content: css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
  }),

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
    width: '',
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
