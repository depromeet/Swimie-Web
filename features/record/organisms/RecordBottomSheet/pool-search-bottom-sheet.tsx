'use client';

import { useState } from 'react';

import { SearchBar } from '@/components/molecules/Search';
import { css } from '@/styled-system/css';

import { BottomSheetProps } from './type';

interface PoolSearchBottomSheetProps extends BottomSheetProps<string> {
  title: string;
  placeholder: string;
}

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
      <SearchBar placeholder={placeholder} onChange={handlePoolNameChange} />
      <ul>
        {dummyResult.map((result) => (
          <li
            key={result}
            className={css(listStyles)}
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
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '15rem',
  backgroundColor: 'white',
  border: '1.5px solid black',
  bottom: 0,
  left: 0,
  padding: '10px',
});

const titleStyles = css.raw({
  marginBottom: '10px',
});

const listStyles = css.raw({
  padding: '4px 0',
});
