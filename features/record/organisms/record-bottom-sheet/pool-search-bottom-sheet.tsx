'use client';

import { debounce } from 'lodash';
import { Suspense, useState } from 'react';

import { SearchBar } from '@/components/molecules/search-bar';
import { css, cva, cx } from '@/styled-system/css';

import useSearchPool from '../../queries/use-search-pool';
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
  return isOpen ? (
    //지영's Bottom Sheet로 대체
    <div className={cx(PoolSearchBottomSheetStyles, className)}>
      <h2 className={titleStyles}>{title}</h2>
      <SearchBar
        placeholder={placeholder}
        onChange={handlePoolNameChange}
        className={css({ marginBottom: '12px' })}
      />
      <ul className={listStyles}>
        <Suspense fallback={'스켈레톤 컴포넌트'}>
          {data?.data.poolInfos.map((info, i: number) => (
            <li
              key={info.poolId}
              className={css(
                data?.data.poolInfos.length - 1 !== i
                  ? listElementStyles.raw({ notLast: true })
                  : listElementStyles.raw(),
              )}
              onClick={() => handleClickPoolListElement(info.name, info.poolId)}
            >
              {info.name}
            </li>
          ))}
        </Suspense>
      </ul>
    </div>
  ) : null;
}

const PoolSearchBottomSheetStyles = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '317px',
  backgroundColor: 'white',
  border: '1.5px solid black',
  borderRadius: '20px 20px 0 0',
  padding: '32px 20px',
});

const titleStyles = css({
  marginBottom: '16px',
});

const listStyles = css({
  padding: '8px 0',
  marginBottom: '8px',
  overflow: 'auto',
});

const listElementStyles = cva({
  base: {
    padding: '6px 10px',
  },
  variants: {
    notLast: {
      true: { marginBottom: '8px' },
    },
  },
});
