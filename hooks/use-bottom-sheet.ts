'use client';

import { useAtom } from 'jotai';

import { bottomSheetAtom } from '@/store';

import { usePreventBodyScroll } from './use-prevent-body-scroll';

/**
 * @description 바텀시트를 조작하기 위해 사용합니다.
 *
 * 사용 방법
 * const [isOpen, open, close] = useBottomSheet();
 *
 * return <BottomSheet isOpen={isOpen} onClose={close}>
 */
export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useAtom(bottomSheetAtom);

  usePreventBodyScroll({ isOpen });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close } as const;
};
