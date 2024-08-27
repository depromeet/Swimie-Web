'use client';

import { ChangeEvent, useState } from 'react';

import { SearchIcon, TextDeleteIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface SearchBarProps {
  value: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (text: string) => void;
}

/**
 * @param value 현재 input value
 * @param placeholder input placeholder
 * @param className seach-bar layout 외부스타일 주입
 * @param inputClassName input 태그 외부스타일 주입
 * @param onChange value 값 변경하는 function
 */
export function SearchBar({
  value,
  placeholder,
  className,
  inputClassName,
  onChange,
}: SearchBarProps) {
  const [searchText, setSearchText] = useState(value);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSearchText(newText);
    onChange?.(newText);
  };

  const handleDeleteTextClick = () => {
    setSearchText('');
    onChange?.('');
  };

  return (
    <div className={cx(layoutStyles, className)}>
      <SearchIcon />
      <input
        value={searchText}
        className={cx(inputStyles, inputClassName)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {searchText && (
        <TextDeleteIcon
          onClick={handleDeleteTextClick}
          className={css({ position: 'absolute', right: '16px' })}
        />
      )}
    </div>
  );
}

const layoutStyles = flex({
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  height: '44px',
  padding: '10px 44px 10px 16px',
  backgroundColor: 'fill.normal',
  borderRadius: '12px',
});

const inputStyles = css({
  width: '100%',
  marginLeft: '8px',
  outline: 'none',
  '&::placeholder': {
    paddingLeft: '2px',
  },
  '&:focus': {
    caretColor: 'primary.swim.총거리.default',
  },
});
