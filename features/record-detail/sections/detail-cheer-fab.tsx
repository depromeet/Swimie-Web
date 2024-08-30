'use client';

import { CheerBottomSheet, CheerProgress } from '@/components/molecules';
import { useCheerBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';

import { useCheerList, useCheerPreviewList } from '../apis';
import { RecordDetailType } from '../types';

export const DetailCheerFabSection = ({ data }: { data: RecordDetailType }) => {
  const { refetch: refetchCheer } = useCheerPreviewList(data.id);
  const { refetch: refetchCheerList } = useCheerList(data.id);

  const handleSuccessCheer = () => {
    void refetchCheer();
    void refetchCheerList();
  };

  const {
    cheerList,
    selectedCheerItem,
    handleClickCheerItem,
    handleClickSendCheer,
    handleChangeSelectedItem,
    isOpenBottomSheet,
    handleClickCloseBottomSheet,
    handleClickOpenBottomSheet,
  } = useCheerBottomSheet({
    memoryId: data.id,
    onSuccessCheer: handleSuccessCheer,
    isIncludeVerification: { isMyMemory: data.isMyMemory },
  });

  const { isMyMemory } = data;
  return (
    <>
      {/* NOTE: 응원 FAB Button */}
      {!isMyMemory && (
        <button
          className={cheerButtonWrapperStyle}
          onClick={handleClickOpenBottomSheet}
        >
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
        onClose={handleClickCloseBottomSheet}
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
