'use client';

import { debounce } from 'lodash';
import { Suspense, useState } from 'react';

import { HeaderBar, PageModal } from '@/components/molecules';
import { SearchBar } from '@/components/molecules/search-bar';
import { css } from '@/styled-system/css';

import { useSearchPoolInitial } from '../../apis';
import { usePoolSearchPageModal } from '../../hooks';
import { PoolSearchResultElement } from '../molecules';
import { PoolSearchResultList } from './pool-search-result-list';

interface PoolSearchPageModalProps {
  title: string;
}

/**
 * @param title 수영 검색 page-modal 제목
 */
export function PoolSearchPageModal({ title }: PoolSearchPageModalProps) {
  const { pageModalRef, pageModalState, handlers } = usePoolSearchPageModal();
  const [poolSearchText, setPoolSearchText] = useState('');

  const { data } = useSearchPoolInitial(poolSearchText);
  const isDataEmpty =
    data?.data.favoritePools.length === 0 &&
    data?.data.searchedPools.length === 0;

  const handlePoolSearchTextChange = debounce((text: string) => {
    setPoolSearchText(text);
  }, 300);

  return (
    <PageModal
      isOpen={pageModalState.isOpen}
      jumpDirection={pageModalState.jumpDirection}
      ref={pageModalRef}
    >
      <div ref={pageModalRef}>
        <HeaderBar onClickBack={() => handlers.onClosePageModal()} />
        <div className={layoutStyles}>
          <h2 className={textStyles.title}>{title}</h2>
          <SearchBar
            value={poolSearchText}
            placeholder="수영장 검색"
            onChange={handlePoolSearchTextChange}
            className={css({ marginBottom: '12px' })}
          />
          {!poolSearchText && isDataEmpty && (
            <p className={textStyles.searchInfo}>
              검색한 수영장을
              <br /> 즐겨찾기할 수 있어요
            </p>
          )}
          {/* Todo: 스켈레톤 컴포넌트 */}
          {!poolSearchText && !isDataEmpty && (
            <Suspense fallback={'스켈레톤 컴포넌트'}>
              {data?.data.favoritePools.map((pool) => (
                <PoolSearchResultElement
                  key={pool.poolId}
                  {...pool}
                  isFavorite
                />
              ))}
              {data?.data.searchedPools.map((pool) => (
                <PoolSearchResultElement key={pool.poolId} {...pool} />
              ))}
            </Suspense>
          )}
          {poolSearchText && (
            <Suspense fallback={'스켈레톤 컴포넌트'}>
              <PoolSearchResultList poolSearchText={poolSearchText} />
            </Suspense>
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
