'use client';

import { debounce } from 'lodash';
import { Suspense, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { HeaderBar } from '@/components/molecules';
import { SearchBar } from '@/components/molecules/search-bar';
import { css, cva, cx } from '@/styled-system/css';

import useSearchPool from '../queries/use-search-pool';
import useSearchPoolInitial from '../queries/use-search-pool-initial';
import { PoolSearchListElement } from './pool-search-list-element';

interface PoolSearchPageModalProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  closeModal: () => void;
  className?: string;
  modifyValue?: (value: { name: string; poolId: number }) => void;
  jumpDirection: 'forward' | 'backward';
}

export function PoolSearchPageModal({
  isOpen,
  title,
  placeholder,
  modifyValue,
  closeModal,
  jumpDirection,
  className,
}: PoolSearchPageModalProps) {
  //추후 api 통신으로 대체
  const [searchPoolName, setSearchPoolName] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  const { data: poolInitialData } = useSearchPoolInitial(searchPoolName);
  const { data: poolSearchData } = useSearchPool(searchPoolName);

  const handlePoolNameChange = debounce((text: string) => {
    setSearchPoolName(text);
  }, 300);

  const handleClickPoolListElement = (name: string, poolId: number) => {
    modifyValue && modifyValue({ name, poolId });
    closeModal && closeModal();
  };
  return (
    <CSSTransition
      nodeRef={ref}
      classNames={`record-distance-jump-${jumpDirection}`}
      timeout={300}
      in={isOpen}
      mountOnEnter
      unmountOnExit
    >
      <div className={cx(layoutStyles.modal, className)} ref={ref}>
        <HeaderBar onClickBackArrow={closeModal} />
        <div className={layoutStyles.content}>
          <h2 className={textStyles.title}>{title}</h2>
          <SearchBar
            placeholder={placeholder}
            onChange={handlePoolNameChange}
            className={css({ marginBottom: '12px' })}
          />
          <ul className={listStyles.list}>
            {!searchPoolName && (
              <p className={textStyles.searchInfo}>
                검색한 수영장을
                <br /> 즐겨찾기할 수 있어요
              </p>
            )}
            <Suspense fallback={'스켈레톤 컴포넌트'}>
              {poolInitialData?.data.favoritePools.map((info) => (
                <PoolSearchListElement
                  key={info.poolId}
                  poolId={info.poolId}
                  name={info.name}
                  address={info.address}
                  isFavorite={info.isFavorite}
                  className={css({ marginBottom: '8px' })}
                  onClick={() =>
                    handleClickPoolListElement(info.name, info.poolId)
                  }
                />
              ))}
              {poolInitialData?.data.searchedPools.map((info, i: number) => (
                <PoolSearchListElement
                  key={info.poolId}
                  poolId={info.poolId}
                  name={info.name}
                  address={info.address}
                  isFavorite={info.isFavorite}
                  className={css(
                    poolInitialData?.data.favoritePools.length - 1 !== i
                      ? listStyles.element.raw({ notLast: true })
                      : listStyles.element.raw(),
                  )}
                  onClick={() =>
                    handleClickPoolListElement(info.name, info.poolId)
                  }
                />
              ))}
              {poolSearchData?.data.poolInfos.map((info, i: number) => (
                <PoolSearchListElement
                  key={info.poolId}
                  poolId={info.poolId}
                  name={info.name}
                  address={info.address}
                  isFavorite={info.isFavorite}
                  className={css(
                    poolSearchData?.data.poolInfos.length - 1 !== i
                      ? listStyles.element.raw({ notLast: true })
                      : listStyles.element.raw(),
                  )}
                  onClick={() =>
                    handleClickPoolListElement(info.name, info.poolId)
                  }
                />
              ))}
            </Suspense>
          </ul>
        </div>
      </div>
    </CSSTransition>
  );
}

const layoutStyles = {
  modal: css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
  }),
  content: css({
    padding: '0 20px',
  }),
};

const textStyles = {
  title: css({
    margin: '8px 0 16px 0',
    textStyle: 'heading3',
    fontWeight: 600,
  }),
  searchInfo: css({
    marginTop: '78px',
    textStyle: 'body2.normal',
    fontWeight: 400,
    color: 'text.alternative',
    textAlign: 'center',
  }),
};

const listStyles = {
  list: css({
    padding: '8px 0',
    marginBottom: '8px',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  }),
  element: cva({
    base: {
      padding: '6px 10px',
    },
    variants: {
      notLast: {
        true: { marginBottom: '8px' },
      },
    },
  }),
};
