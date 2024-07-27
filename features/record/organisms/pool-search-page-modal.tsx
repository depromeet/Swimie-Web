'use client';

import { useAtom } from 'jotai';
import { useRef } from 'react';

import { HeaderBar, PageModal } from '@/components/molecules';

import { isPoolSearchPageModalOpen } from '../store/page-modal';

export function PoolSearchPageModal() {
  const pageModalRef = useRef<HTMLDivElement>(null);
  const [pageModalState, setPageModalState] = useAtom(
    isPoolSearchPageModalOpen,
  );

  const handleBackArrowClick = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };
  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div ref={pageModalRef}>
        <HeaderBar onClickBackArrow={handleBackArrowClick} />
        <div>수영 검색 페이지 모달</div>
      </div>
    </PageModal>
  );
}
