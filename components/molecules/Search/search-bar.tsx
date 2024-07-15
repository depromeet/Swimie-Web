'use client';

import { ChangeEvent, useState } from 'react';

import { SearchIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SearchBarProps } from './type';

export function SearchBar({
  placeholder,
  addStyles,
  addInputStyles,
  onChange,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSearchText(newText);
    onChange && onChange(newText);
  };

  return (
    <div className={css(searchBarStyles, addStyles)}>
      <SearchIcon />
      <input
        value={searchText}
        className={css(inputStyles, addInputStyles)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}

const searchBarStyles = css.raw({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '2rem',
  padding: '10px 12px',
  paddingRight: 0,
  backgroundColor: '#EFEFEF',
  borderRadius: '10px',
});

const inputStyles = css.raw({
  width: '100%',
  marginLeft: '3px',
  paddingLeft: '2px',
});
