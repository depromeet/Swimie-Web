'use client';

import { useState } from 'react';

export function UseRecordDistancePageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [jumpDirection, setJumpDirection] = useState<'forward' | 'backward'>(
    'forward',
  );

  const openPageModal = () => {
    setJumpDirection('forward');
    setIsOpen(true);
  };

  const closePageModal = () => {
    setJumpDirection('backward');
    setIsOpen(false);
  };

  const changeJumpDirection = (direction: 'forward' | 'backward') => {
    setJumpDirection(direction);
  };

  return {
    isOpen,
    jumpDirection,
    handlers: {
      openPageModal,
      closePageModal,
      changeJumpDirection,
    },
  };
}
