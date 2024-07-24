'use client';

import { useState } from 'react';

export function useLaneLengthBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => {
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handlers: {
      openBottomSheet,
      closeBottomSheet,
    },
  };
}