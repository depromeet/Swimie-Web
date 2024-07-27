'use client';

import { useAtom } from 'jotai';
import { useRef, useState } from 'react';

import { HeaderBar, PageModal } from '@/components/molecules';
import { SearchBar } from '@/components/molecules/search-bar';
import { css } from '@/styled-system/css';

import { isPoolSearchPageModalOpen } from '../store/page-modal';

export function PoolSearchPageModal() {
  const pageModalRef = useRef<HTMLDivElement>(null);
  const [poolSearchText, setPoolSearchText] = useState('');
  const [pageModalState, setPageModalState] = useAtom(
    isPoolSearchPageModalOpen,
  );

  const handleBackArrowClick = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };
  const handlePoolSearchTextChange = (text: string) => {
    setPoolSearchText(text);
  };
  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div ref={pageModalRef}>
        <HeaderBar onClickBackArrow={handleBackArrowClick} />
        <div className={contentLayoutStyles}>
          {/* 임시 SearchBar */}
          <SearchBar
            value={poolSearchText}
            placeholder="수영장 검색"
            onChange={handlePoolSearchTextChange}
          />
          {poolSearchText}
        </div>
      </div>
    </PageModal>
  );
}

const contentLayoutStyles = css({
  padding: '0 20px',
});
