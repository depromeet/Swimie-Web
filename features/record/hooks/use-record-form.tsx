'use client';

import { useSetAtom } from 'jotai';
import { useState } from 'react';

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
  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setIsDistancePageModalOpen = useSetAtom(isDistancePageModalOpen);
  const setTimeBottomSheetState = useSetAtom(timeBottomSheetState);
  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );

  const onOpenPoolSearchPageModal = () => {
    setIsPoolSearchPageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const onOpenDistancePageModal = () => {
    setIsDistancePageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const onOpenStartTimeBottomSheet = () => {
    setTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'start',
      isOpen: true,
    }));
  };

  const onOpenEndTimeBottomSheet = () => {
    setTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'end',
      isOpen: true,
    }));
  };

  const onOpenLaneLengthBottomSheet = () => {
    setIsLaneLengthBottomSheetOpen(true);
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
