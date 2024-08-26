'use client';

import { useState } from 'react';

import { useBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';

import { useCheer, useCheerPreviewList } from '../apis';
import { CheerBottomSheet, CheerProgress } from '../components';
import { initialCheerList } from '../data';
import { DetailCheerItemSelected, RecordDetailType } from '../types';

export const DetailCheerFabSection = ({ data }: { data: RecordDetailType }) => {
  const { mutate: mutateCheer } = useCheer();
  const { refetch: refetchCheer } = useCheerPreviewList(data.id);

  const [cheerList, setCheerList] = useState(initialCheerList);
  const [selectedCheerItem, setSelectedCheerItem] =
    useState<DetailCheerItemSelected>();

  const {
    isOpen: isOpenBottomSheet,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();

  const handleClickCheerItem = (index: number) => {
    setCheerList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, isSelected: !item.isSelected }
          : { ...item, isSelected: false },
      ),
    );
  };

  const handleClickSendCheer = () => {
    const selectedCheerItem = cheerList.find(({ isSelected }) => isSelected);
    if (!selectedCheerItem) return;

    mutateCheer(
      {
        emoji: selectedCheerItem.emoji,
        comment: selectedCheerItem.comment,
        memoryId: data.id,
      },
      {
        onSuccess: ({ status, code, message }) => {
          if (status !== 200 || code === 'REACTION_4') {
            alert(message);
            return;
          }

          void refetchCheer();
          setSelectedCheerItem(selectedCheerItem);
          closeBottomSheet();
        },
      },
    );
  };

  const handleChangeSelectedItem = (isOpen: boolean) => {
    if (isOpen) return;
    setSelectedCheerItem(undefined);
  };

  const { isMyMemory } = data;

  return (
    <>
      {/* NOTE: 응원 FAB Button */}
      {!isMyMemory && (
        <button className={cheerButtonWrapperStyle} onClick={openBottomSheet}>
          {data.member?.name}님에게 응원 보내기 👏
        </button>
      )}

      {/* NOTE: 응원 Progress 모달 */}
      <CheerProgress
        isOpen={Boolean(selectedCheerItem)}
        onChangeOpen={handleChangeSelectedItem}
        authorName={data.member?.name ?? ''}
        cheerItem={selectedCheerItem}
      />

      {/* NOTE: 응원 바텀시트 */}
      <CheerBottomSheet
        header={{ title: '응원 보내기' }}
        isOpen={isOpenBottomSheet}
        onClose={closeBottomSheet}
        cheerList={cheerList}
        onClickCheerItem={handleClickCheerItem}
        onClickSendCheer={handleClickSendCheer}
      />
    </>
  );
};

const cheerButtonWrapperStyle = css({
  position: 'fixed',
  right: '20px',
  bottom: 'calc(35px + env(safe-area-inset-bottom))',
  p: '10px 20px',
  backgroundColor: 'primary.swim.총거리.default',
  color: 'white',
  textStyle: 'body2.normal',
  fontWeight: 'bold',
  rounded: 'full',
  cursor: 'pointer',
  shadow: 'emphasize',
  zIndex: 100,

  '@media (min-width: 600px)': {
    right: 'calc(50% - 300px + 20px);',
  },
});
