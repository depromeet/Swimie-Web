'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/atoms';
import { CheerBottomSheet, CheerProgress } from '@/components/molecules';
import { useCheerBottomSheet } from '@/hooks';
import { css } from '@/styled-system/css';

interface CheerUpButtonProps {
  memoryId: number;
  nickname: string;
}

export const CheerUpButton = ({ memoryId, nickname }: CheerUpButtonProps) => {
  const router = useRouter();
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
    memoryId,
    isIncludeVerification: {
      isMyMemory: false,
    },
  });

  const handleChangeOpen = (isOpen: boolean) => {
    handleChangeSelectedItem(isOpen);
    router.push(`/record-detail/${memoryId}`);
  };

  return (
    <>
      <Button
        label={'응원 보내기 👏'}
        buttonType="primary"
        className={buttonStyles}
        onClick={handleClickOpenBottomSheet}
      />

      {/* NOTE: 응원 Progress 모달 */}
      <CheerProgress
        isOpen={Boolean(selectedCheerItem)}
        onChangeOpen={handleChangeOpen}
        authorName={nickname}
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

const buttonStyles = css({
  mt: '4px',
  w: 'full',
  p: '10px 20px',
  backgroundColor: 'blue.95',
  fontWeight: 'bold',
});
