'use client';

import { ChangeEvent } from 'react';

import { SearchIcon } from '@/components/atoms';
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

const layoutStyles = flex({
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
