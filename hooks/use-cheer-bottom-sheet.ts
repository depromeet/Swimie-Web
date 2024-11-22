'use client';

import { ChangeEvent, useState } from 'react';

import { DetailCheerItemSelected } from '@/features/record-detail';
import { useCheer, useCheerEligibility, usePreventBodyScroll } from '@/hooks';

import { useToast } from './use-toast';

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

type UseCheerBottomSheet = {
  memoryId: number;
  onSuccessCheer?: () => void;
  isIncludeVerification?: {
    isMyMemory?: boolean;
  };
};
export const useCheerBottomSheet = ({
  memoryId,
  onSuccessCheer,
  isIncludeVerification,
}: UseCheerBottomSheet) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [isOpenDirectCheerBottomSheet, setIsOpenDirectCheerBottomSheet] =
    useState(false);
  const [cheerList, setCheerList] = useState(initialCheerList);
  const [selectedCheerItem, setSelectedCheerItem] =
    useState<DetailCheerItemSelected>();
  const [directCheerComment, setDirectCheerComment] = useState('');

  const { mutate: mutateCheer } = useCheer();
  const { data: eligibilityData, refetch: refetchCheerEligibility } =
    useCheerEligibility(
      memoryId,
      isIncludeVerification && isIncludeVerification?.isMyMemory,
    );
  usePreventBodyScroll({ isOpen: isOpenBottomSheet });

  const { toast } = useToast();

  const handleClickCloseBottomSheet = () => {
    setIsOpenBottomSheet(false);
  };

  const handleClickOpenBottomSheet = () => {
    const isRequireVerification =
      isIncludeVerification && !isIncludeVerification.isMyMemory;

    if (isRequireVerification && !eligibilityData?.isRegistrable) {
      toast('하나의 기록에 3번까지 응원을 보낼 수 있어요', { type: 'warning' });
      return;
    }

    setIsOpenBottomSheet(true);
  };

  const handleOpenDirectCheerBottomSheet = () => {
    setIsOpenDirectCheerBottomSheet(true);
  };

  const handleCloseDirectCheerBottomSheet = () => {
    setIsOpenDirectCheerBottomSheet(false);
  };

  const handleClickCloseDirectCheerBottomSheet = () => {
    setIsOpenDirectCheerBottomSheet(false);
  };

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
    const selectedCheerItem = isOpenDirectCheerBottomSheet
      ? {
          emoji: '💬',
          comment: directCheerComment,
        }
      : cheerList.find(({ isSelected }) => isSelected);
    if (!selectedCheerItem) return;

    mutateCheer(
      {
        emoji: selectedCheerItem.emoji,
        comment: selectedCheerItem.comment,
        memoryId,
      },
      {
        onSuccess: ({ status, code, message }) => {
          if (status === 400 || code === 'REACTION_4') {
            alert(message);
            return;
          }

          setSelectedCheerItem(selectedCheerItem);
          handleClickCloseBottomSheet();
          isOpenDirectCheerBottomSheet &&
            handleClickCloseDirectCheerBottomSheet();
          directCheerComment && setDirectCheerComment('');
          void refetchCheerEligibility();
          onSuccessCheer?.();
        },
      },
    );
  };

  const handleChangeSelectedItem = (isOpen: boolean) => {
    if (isOpen) return;
    setSelectedCheerItem(undefined);
  };

  const handleChangeDirectCheerComment = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setDirectCheerComment(event.target.value);
  };

  return {
    cheerList,
    selectedCheerItem,
    handleClickCheerItem,
    handleClickSendCheer,
    handleChangeSelectedItem,
    handleClickOpenBottomSheet,
    handleClickCloseBottomSheet,
    handleChangeDirectCheerComment,
    handleOpenDirectCheerBottomSheet,
    handleCloseDirectCheerBottomSheet,
    directCheerComment,
    isOpenBottomSheet,
    isOpenDirectCheerBottomSheet,
  };
};
