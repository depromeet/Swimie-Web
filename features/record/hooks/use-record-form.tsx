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
import { StrokeProps } from '../types';

export function useRecordForm(lane: number) {
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

  const modifyStrokesData = (strokes: StrokeProps[]) => {
    if (
      (strokes.length === 1 && strokes[0].name === '총거리') ||
      (strokes.length === 1 && strokes[0].name === '총바퀴')
    )
      return undefined;
    else {
      if (strokes.every((stroke) => stroke.meter))
        return strokes
          .map((stroke) => `${stroke.name} ${stroke.meter.toLocaleString()}m`)
          .join(' · ');
      else
        return strokes
          .map(
            (stroke) =>
              `${stroke.name} ${(stroke.laps * 2 * lane).toLocaleString()}m`,
          )
          .join(' · ');
    }
  };

  return {
    isLoading,
    modifySubmitData,
    modifyStrokesData,
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
