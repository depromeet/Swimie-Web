'use client';

import { useEffect, useState } from 'react';

import useGetBrowserWidth from './use-get-browser-width';

export function useTimeBottomSheet(isBottomSheetOpen: boolean) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const width = useGetBrowserWidth();

  useEffect(() => {
    if (isBottomSheetOpen) {
      setTimeout(() => {
        setShowTimePicker(true);
      }, 150);
    } else setShowTimePicker(false);
  }, [isBottomSheetOpen]);

  return { width, showTimePicker };
}
