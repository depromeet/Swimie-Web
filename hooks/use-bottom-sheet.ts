'use client';

import { useAtom } from 'jotai';

import { bottomSheetAtom } from '@/store';

/**
 * @description appbarOpacity를 조작하는 바텀시트를 사용할 때 사용합니다.
 *
 * 사용 방법은 아래와 같습니다.
 * const [isOpen, open, close] = useBottomSheet();
 *
 * return <BottomSheet isOpen={isOpen} onClose={close}>
 */
export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useAtom(bottomSheetAtom);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close] as const;
};
