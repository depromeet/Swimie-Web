'use client';

import { useState } from 'react';

import { SearchBar } from '@/components/molecules/Search';
import { css, cva } from '@/styled-system/css';

import { PoolSearchBottomSheetProps } from './type';

export function PoolSearchBottomSheet({
  isOpen,
  title,
  placeholder,
  modifyValue,
  closeBottomSheet,
  addStyles,
}: PoolSearchBottomSheetProps) {
  //추후 api 통신으로 대체
  const [searchPoolName, setSearchPoolName] = useState<string>('');
  const dummyResult = [
    searchPoolName + '1',
    searchPoolName + '2',
    searchPoolName + '3',
  ];

  const handlePoolNameChange = (text: string) => {
    setSearchPoolName(text);
  };

  const handleClickPoolListElement = (pool: string) => {
    modifyValue && modifyValue(pool);
    closeBottomSheet && closeBottomSheet();
  };
  return isOpen ? (
    //지영's Bottom Sheet로 대체
    <div className={css(PoolSearchBottomSheetStyles, addStyles)}>
      <h2 className={css(titleStyles)}>{title}</h2>
      <SearchBar
        placeholder={placeholder}
        onChange={handlePoolNameChange}
        addStyles={css.raw({ marginBottom: '12px' })}
      />
      <ul className={css(listStyles)}>
        {dummyResult.map((result, i: number) => (
          <li
            key={result}
            className={css(
              dummyResult.length - 1 !== i
                ? listElementStyles.raw({ notLast: true })
                : listElementStyles.raw(),
            )}
            onClick={() => handleClickPoolListElement(result)}
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

const PoolSearchBottomSheetStyles = css.raw({
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

const titleStyles = css.raw({
  marginBottom: '16px',
});

const listStyles = css.raw({
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
