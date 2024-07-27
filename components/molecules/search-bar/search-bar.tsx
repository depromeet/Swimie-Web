'use client';

import { ChangeEvent } from 'react';

import { SearchIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

export interface SearchBarProps {
  value: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (text: string) => void;
}

export function SearchBar({
  value,
  placeholder,
  className,
  inputClassName,
  onChange,
}: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    onChange?.(newText);
  };

  return (
    <div className={cx(layoutStyles, className)}>
      <SearchIcon />
      <input
        value={value}
        className={cx(inputStyles, inputClassName)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}

const layoutStyles = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '44px',
  padding: '10px 16px',
  backgroundColor: 'fill.normal',
  borderRadius: '12px',
});

const inputStyles = css({
  width: '100%',
  marginLeft: '3px',
  paddingLeft: '2px',
  outline: 'none',
});
