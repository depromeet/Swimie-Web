import { SearchIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { SearchBarProps } from './type';

export function SearchBar({
  placeholder,
  addStyles,
  addInputStyles,
}: SearchBarProps) {
  return (
    <div className={css(searchBarStyles, addStyles)}>
      <SearchIcon />
      <input
        className={css(inputStyles, addInputStyles)}
        placeholder={placeholder}
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
  backgroundColor: '#EFEFEF',
});

const inputStyles = css.raw({
  width: '100%',
});
