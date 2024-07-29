'use client';

import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';

import { isDistancePageModalOpen } from '../store';

export function useDistancePageModal<T>() {
  const pageModalRef = useRef<T>(null);
  const setPageModalState = useSetAtom(isDistancePageModalOpen);
  const [secondaryTabIndex, setSecondaryTabIndex] = useState(0);
  const [assistiveTabIndex, setAssistiveTabIndex] = useState(0);
  const [totalDistance, setTotalDistance] = useState('');
  const unitMap = new Map([
    [0, '미터(m)'],
    [1, '바퀴'],
  ]);
  const unit = unitMap.get(assistiveTabIndex);

  const onClosePageModal = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };

  const onChangeSecondaryTabIndex = (index: number) => {
    setSecondaryTabIndex(index);
  };

  const onChangeAssistiveTabIndex = (index: number) => {
    setAssistiveTabIndex(index);
  };

  const onChangeTotalDistance = (text: string) => {
    setTotalDistance(text);
  };

  return {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalDistance,
    unit,
    handlers: {
      onClosePageModal,
      onChangeSecondaryTabIndex,
      onChangeAssistiveTabIndex,
      onChangeTotalDistance,
    },
  };
}
