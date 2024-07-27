'use client';

import { useAtom } from 'jotai';
import { Suspense, useRef, useState } from 'react';

import { HeaderBar, PageModal } from '@/components/molecules';
import { SearchBar } from '@/components/molecules/search-bar';
import { css } from '@/styled-system/css';

import { isPoolSearchPageModalOpen } from '../store/page-modal';
import { PoolSearchResultList } from './pool-search-result-list';

interface PoolSearchPageModalProps {
  title: string;
}

/**
 * @param title 수영 검색 page-modal 제목
 */
export function PoolSearchPageModal({ title }: PoolSearchPageModalProps) {
  const pageModalRef = useRef<HTMLDivElement>(null);
  const [poolSearchText, setPoolSearchText] = useState('');
  const [pageModalState, setPageModalState] = useAtom(
    isPoolSearchPageModalOpen,
  );

  const handleBackArrowClick = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };
  // api 연결 후 debounce 처리
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
        <div className={layoutStyles}>
          <h2 className={textStyles.title}>{title}</h2>
          <SearchBar
            value={poolSearchText}
            placeholder="수영장 검색"
            onChange={handlePoolSearchTextChange}
            className={css({ marginBottom: '12px' })}
          />
          {!poolSearchText ? (
            <p className={textStyles.searchInfo}>
              검색한 수영장을
              <br /> 즐겨찾기할 수 있어요
            </p>
          ) : (
            // <ErrorBoundary fallback={'에러 표시 컴포넌트'}>
            <Suspense fallback={'스켈레톤 컴포넌트'}>
              <PoolSearchResultList poolSearchText={poolSearchText} />
            </Suspense>
            // </ErrorBoundary>
          )}
        </div>
      </div>
    </PageModal>
  );
}

const layoutStyles = css({
  padding: '0 20px',
});

const textStyles = {
  title: css({
    margin: '8px 0 16px 0',
    textStyle: 'heading3',
    fontWeight: 600,
  }),
  searchInfo: css({
    marginTop: '86px',
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
    textAlign: 'center',
  }),
};
