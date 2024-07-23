'use client';

import { ChangeEvent, useState } from 'react';

import { SearchIcon } from '@/components/atoms/icons/search-icon';
import { css, cx } from '@/styled-system/css';

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (text: string) => void;
}

export function SearchBar({
  placeholder,
  className,
  inputClassName,
  onChange,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState<string>('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSearchText(newText);
    onChange && onChange(newText);
  };

  return (
    <div className={cx(searchBarStyles, className)}>
      <SearchIcon />
      <input
        value={searchText}
        className={cx(inputStyles, inputClassName)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}

const searchBarStyles = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '2rem',
  padding: '12px 0 12px 16px',
  backgroundColor: '#F6F6F6',
  borderRadius: '12px',
});

const inputStyles = css({
  width: '100%',
  marginLeft: '3px',
  paddingLeft: '2px',
  outline: 'none',
});
