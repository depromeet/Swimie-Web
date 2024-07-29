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
    handlers: {
      onClosePageModal,
      onChangeSecondaryTabIndex,
      onChangeAssistiveTabIndex,
      onChangeTotalDistance,
    },
  };
}
