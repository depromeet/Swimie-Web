'use client';

import { useState } from 'react';

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const totalMove = touchStartX - touchEndX;

    if (Math.abs(totalMove) > threshold) {
      if (totalMove > 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    setTouchStartX(null);
  }

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}
