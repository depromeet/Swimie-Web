'use client';

import { useAtom } from 'jotai';

import { modalAtom } from '@/store';

import { usePreventBodyScroll } from './use-prevent-body-scroll';

/**
 * @description 모달을 조작하기 위해 사용합니다.
 *
 * 사용 방법
 * const [isOpen, open, close] = useModal();
 *
 * return <Modal isOpen={isOpen} onClose={close}>
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useAtom(modalAtom);

  usePreventBodyScroll({ isOpen });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close } as const;
};
