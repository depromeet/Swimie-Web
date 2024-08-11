'use client';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { useBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { CheerItem } from '../components';

export const DetailCheer = () => {
  const [isOpen, open, close] = useBottomSheet();

  const handleClickCheerButton = () => {
    open();
  };

  // TODO: 응원하기 flow 구현
  return (
    <>
      <button className={FloatingCheerButton} onClick={handleClickCheerButton}>
        정지영님에게 응원 보내기 👏
      </button>
      <BottomSheet
        header={{ title: '응원 보내기' }}
        isOpen={isOpen}
        onClose={close}
      >
        <div className={TagContainer}>
          <CheerItem icon="🔥" title="오늘도 힘내요!" />
          <CheerItem icon="🦭" title="물개세요?" />
          <CheerItem icon="🏊‍♀️️" />
          <CheerItem icon="👏" />
          <CheerItem
            icon="🏊‍♂️"
            title="진정한 수영인으로 인정합니다"
            isSelected={true}
          />
          <CheerItem icon="🏊" title="다음에 같이 수영해요" />
          <CheerItem icon="😲" title="대단해요!" />
        </div>
        <div className={ButtonContainer}>
          <Button
            label="닫기"
            variant="outlined"
            size="large"
            onClick={close}
          />
          <Button label="보내기" size="large" />
        </div>
      </BottomSheet>
    </>
  );
};

const FloatingCheerButton = css({
  position: 'fixed',
  right: '20px',
  bottom: '35px',
  p: '10px 20px',
  backgroundColor: 'primary.swim.총거리.default',
  color: 'white',
  textStyle: 'body2.normal',
  fontWeight: 'bold',
  rounded: 'full',
  cursor: 'pointer',
  shadow: 'emphasize',

  '@media (min-width: 600px)': {
    right: 'calc(50% - 300px + 20px);',
  },
});

const TagContainer = flex({
  wrap: 'wrap',
  gap: '10px',
  rowGap: '10px',
  p: '8px 20px',
});

const ButtonContainer = grid({
  gap: '10px',
  p: '16px 20px 0 20px',
  gridTemplateColumns: '1fr 1fr',
});
