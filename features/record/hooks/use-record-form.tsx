'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';

import { usePreventBodyScroll } from '@/hooks';
import { formatDateToDash } from '@/utils';

import { SubmitRecordRequestProps } from '../apis';
import {
  isDistancePageModalOpen,
  isLaneLengthBottomSheetOpen,
  isPoolSearchPageModalOpen,
  timeBottomSheetState,
} from '../store';

export function useRecordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [poolSearchPageModalOpen, setPoolSearchPageModalOpen] = useAtom(
    isPoolSearchPageModalOpen,
  );
  const [distancePageModalOpen, setDistancePageModalOpen] = useAtom(
    isDistancePageModalOpen,
  );
  const [swimTimeBottomSheetState, setSwimTimeBottomSheetState] =
    useAtom(timeBottomSheetState);
  const [laneLengthBottomSheetOpen, setLaneLengthBottomSheetOpen] = useAtom(
    isLaneLengthBottomSheetOpen,
  );

  const isPageModalOpened =
    poolSearchPageModalOpen.isOpen || distancePageModalOpen.isOpen;
  const isBottomSheetOpened =
    swimTimeBottomSheetState.isOpen || laneLengthBottomSheetOpen;
  usePreventBodyScroll({ isOpen: isPageModalOpened || isBottomSheetOpened });

  const onOpenPoolSearchPageModal = () => {
    setPoolSearchPageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const onOpenDistancePageModal = () => {
    setDistancePageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const onOpenStartTimeBottomSheet = () => {
    setSwimTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'start',
      isOpen: true,
    }));
  };

  const onOpenEndTimeBottomSheet = () => {
    setSwimTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'end',
      isOpen: true,
    }));
  };

  const onOpenLaneLengthBottomSheet = () => {
    setLaneLengthBottomSheetOpen(true);
  };

  const onChangeIsLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  const getBlobData = (file: File) => {
    const blobData = new Blob([file]);
    return blobData;
  };

  const modifySubmitData = (data: SubmitRecordRequestProps) => {
    const modifiedData = { ...data };

    modifiedData.recordAt = formatDateToDash(modifiedData.recordAt);
    Object.keys(modifiedData).map((field) => {
      const key = field as keyof typeof modifiedData;
      const isEmptyString =
        typeof modifiedData[key] === 'string' && modifiedData[key] === '';
      const isNotANumber =
        typeof modifiedData[key] === 'number' &&
        isNaN(modifiedData[key] as number);
      if (isEmptyString || isNotANumber) {
        delete modifiedData[key];
      }
    });

    return modifiedData;
  };

  return {
    isLoading,
    getBlobData,
    modifySubmitData,
    handlers: {
      onOpenPoolSearchPageModal,
      onOpenDistancePageModal,
      onOpenStartTimeBottomSheet,
      onOpenEndTimeBottomSheet,
      onOpenLaneLengthBottomSheet,
      onChangeIsLoading,
    },
  };
}
