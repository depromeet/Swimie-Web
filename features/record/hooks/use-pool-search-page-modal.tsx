'use client';

import { useAtom } from 'jotai';
import { useRef } from 'react';

import { isPoolSearchPageModalOpen } from '../store';

export function usePoolSearchPageModal() {
  const pageModalRef = useRef<HTMLDivElement>(null);
  const [pageModalState, setPageModalState] = useAtom(
    isPoolSearchPageModalOpen,
  );

  const onClosePageModal = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };

  return { pageModalState, pageModalRef, handlers: { onClosePageModal } };
}
