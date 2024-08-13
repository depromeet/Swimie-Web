'use client';

import { useState } from 'react';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { useBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex, grid } from '@/styled-system/patterns';

import { CheerItem } from '../components';
import { RecordDetailType } from '../types';

const initialCheerList = [
  {
    emoji: '🔥',
    comment: '오늘도 힘내요!',
    isSelected: false,
  },
  {
    emoji: '🦭',
    comment: '물개세요?',
    isSelected: false,
  },
  {
    emoji: '🏊',
    isSelected: false,
  },
  {
    emoji: '👏',
    isSelected: false,
  },
  {
    emoji: '🏊‍♂️',
    comment: '진정한 수영인으로 인정합니다',
    isSelected: false,
  },
  {
    emoji: '🏊‍♂️',
    comment: '다음에 같이 수영해요',
    isSelected: false,
  },
  {
    emoji: '😲',
    comment: '대단해요!',
    isSelected: false,
  },
];

export const DetailCheer = ({ data }: { data: RecordDetailType }) => {
  const [cheerList, setCheerList] = useState(initialCheerList);
  const [isOpen, open, close] = useBottomSheet();

  const handleClickCheerItem = (index: number) => {
    setCheerList((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const handleClickSendCheer = () => {
    const selectedCheerList = cheerList.filter(({ isSelected }) => isSelected);
    if (!selectedCheerList.length) {
      alert('응원 문구를 선택해주세요.');
      return;
    }

    // TODO: 응원 보내기 api 연동
    console.log('send!', selectedCheerList);
  };

  // TODO: 응원하기 flow 구현
  return (
    <>
      <button className={floatingCheerButton} onClick={open}>
        {data.member?.name}님에게 응원 보내기 👏
      </button>
      <BottomSheet
        header={{ title: '응원 보내기' }}
        isOpen={isOpen}
        onClose={close}
      >
        <div className={tagContainerStyle}>
          {cheerList.map((item, index) => (
            <CheerItem
              key={index}
              onClick={() => handleClickCheerItem(index)}
              {...item}
            />
          ))}
        </div>
        <div className={buttonContainerStyle}>
          <Button
            label="닫기"
            variant="outlined"
            size="large"
            onClick={close}
          />
          <Button
            label="보내기"
            size="large"
            variant="solid"
            buttonType="primary"
            onClick={handleClickSendCheer}
          />
        </div>
      </BottomSheet>
    </>
  );
};

const floatingCheerButton = css({
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

const tagContainerStyle = flex({
  wrap: 'wrap',
  gap: '10px',
  rowGap: '10px',
  p: '8px 20px',
});

const buttonContainerStyle = grid({
  gap: '10px',
  p: '16px 20px 0 20px',
  gridTemplateColumns: '1fr 1fr',
});
