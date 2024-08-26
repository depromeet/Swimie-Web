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

  const openPoolSearchPageModal = () => {
    setIsPoolSearchPageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const openDistancePageModal = () => {
    setIsDistancePageModalOpen({
      isOpen: true,
      jumpDirection: 'forward',
    });
  };

  const openStartTimeBottomSheet = () => {
    setTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'start',
      isOpen: true,
    }));
  };

  const openEndTimeBottomSheet = () => {
    setTimeBottomSheetState((prev) => ({
      ...prev,
      variant: 'end',
      isOpen: true,
    }));
  };

  const openLaneLengthBottomSheet = () => {
    setIsLaneLengthBottomSheetOpen(true);
  };

  const onChangeIsLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
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
    modifySubmitData,
    handlers: {
      openPoolSearchPageModal,
      openDistancePageModal,
      openStartTimeBottomSheet,
      openEndTimeBottomSheet,
      openLaneLengthBottomSheet,
      onChangeIsLoading,
    },
  };
}
