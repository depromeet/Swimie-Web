'use client';

import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';

import { isDistancePageModalOpen } from '../store';

type tabIndex = 0 | 1;

export function useDistancePageModal<T>(lane: number) {
  const pageModalRef = useRef<T>(null);
  const setPageModalState = useSetAtom(isDistancePageModalOpen);
  const [secondaryTabIndex, setSecondaryTabIndex] = useState<tabIndex>(0);
  const [assistiveTabIndex, setAssistiveTabIndex] = useState<tabIndex>(0);
  const [totalMeter, setTotalMeter] = useState('');
  const [totalLaps, setTotalLaps] = useState('');
  const [totalDistance, setTotalDistance] = useState('');

  const onClosePageModal = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };

  const onChangeSecondaryTabIndex = (index: tabIndex) => {
    setSecondaryTabIndex(index);
  };

  const onChangeAssistiveTabIndex = (index: tabIndex) => {
    setAssistiveTabIndex(index);
  };

  const onChangeTotalMeter = (text: string) => {
    totalLaps && setTotalLaps('');
    setTotalMeter(text);
  };

  const onChangeTotalLaps = (text: string) => {
    totalMeter && setTotalMeter('');
    setTotalLaps(text);
    setTotalDistance(String(Number(text) * lane));
  };

  return {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalMeter,
    totalLaps,
    totalDistance,
    handlers: {
      onClosePageModal,
      onChangeSecondaryTabIndex,
      onChangeAssistiveTabIndex,
      onChangeTotalMeter,
      onChangeTotalLaps,
    },
  };
}
