'use client';

import { Virtuoso } from 'react-virtuoso';

import { Modal, ModalProps } from '@/components/molecules';
import { useDialog } from '@/hooks';
import { css } from '@/styled-system/css';

import { useCheerList, useCheerPreviewList, useCheerRemove } from '../apis';
import { CheerModalItem } from './cheer-modal-item';

// TODO: data 연동 및 props 수정
type CheerModal = {
  memoryId: number;
  isMyMemory: boolean;
  initialItemIndex?: number;
} & ModalProps;
export const CheerModal = ({
  memoryId,
  isMyMemory,
  initialItemIndex,
  isOpen,
  onClose,
  title,
}: CheerModal) => {
  const { dialog, close: closeDialog } = useDialog();
  const { mutate: removeCheer } = useCheerRemove();
  const { refetch: refetchCheerPreview } = useCheerPreviewList(memoryId);
  const {
    flattenData,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchCheerList,
  } = useCheerList(memoryId);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = flattenData.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

  const handleClickRemoveCheer = (reactionId: number) => {
    dialog({
      title: '정말 삭제하시겠습니까?',
      description: '삭제된 응원은 복구할 수 없습니다.',
      buttons: {
        confirm: {
          text: '삭제',
          onClick: () => {
            // TODO: 서버 수정 후 onSuccess 로직 재구현 예정
            removeCheer(reactionId, {
              onSuccess: () => {
                void refetchCheerList();
                void refetchCheerPreview();
                closeDialog();
              },
              onSettled() {
                void refetchCheerList();
                void refetchCheerPreview();
                closeDialog();
              },
            });
          },
        },
        cancel: {
          text: '취소',
          onClick: closeDialog,
        },
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={String(totalCount ?? '')}
      button={{
        text: '닫기',
        onClick: onClose,
      }}
      isBodyFadeOut={true}
    >
      <Virtuoso
        data={flattenData}
        overscan={200}
        initialTopMostItemIndex={initialItemIndex}
        rangeChanged={handleRangeChanged}
        className={contentWrapper}
        itemContent={(_, item) => (
          <CheerModalItem
            key={item.reactionId}
            isMyMemory={isMyMemory}
            onClickRemove={() => handleClickRemoveCheer(item.reactionId)}
            {...item}
          />
        )}
        style={{
          width: '100%',
          height: '332px',
          overflowY: 'scroll',
          paddingBottom: '40px',
        }}
        components={{
          Footer: () => <div style={{ height: '40px' }} />,
        }}
      />
    </Modal>
  );
};

const contentWrapper = css({
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
