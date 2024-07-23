'use client';

import { debounce } from 'lodash';
import { Suspense, useState } from 'react';

import { BottomSheet } from '@/components/molecules';
import { SearchBar } from '@/components/molecules/search-bar';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import useSearchPool from '../queries/use-search-pool';
import { PoolSearchBottomSheetProps } from './type';

export function PoolSearchBottomSheet({
  isOpen,
  title,
  placeholder,
  modifyValue,
  closeBottomSheet,
  className,
}: PoolSearchBottomSheetProps) {
  //추후 api 통신으로 대체
  const [searchPoolName, setSearchPoolName] = useState<string>('');

  const { data } = useSearchPool(searchPoolName);

  const handlePoolNameChange = debounce((text: string) => {
    setSearchPoolName(text);
  }, 300);

  const handleClickPoolListElement = (name: string, poolId: number) => {
    modifyValue && modifyValue({ name, poolId });
    closeBottomSheet && closeBottomSheet();
  };
  return (
    <BottomSheet isOpen={isOpen} onClose={closeBottomSheet}>
      <div className={cx(PoolSearchBottomSheetStyles, className)}>
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
            {data?.data.poolInfos.map((info, i: number) => (
              <li
                key={info.poolId}
                className={css(
                  data?.data.poolInfos.length - 1 !== i
                    ? listStyles.element.raw({ notLast: true })
                    : listStyles.element.raw(),
                )}
                onClick={() =>
                  handleClickPoolListElement(info.name, info.poolId)
                }
              >
                {info.name}
              </li>
            ))}
          </Suspense>
        </ul>
      </div>
    </BottomSheet>
  );
}

const PoolSearchBottomSheetStyles = flex({
  direction: 'column',
  height: '617px',
  padding: '32px 20px',
});

const textStyles = {
  title: css({
    marginBottom: '16px',
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
