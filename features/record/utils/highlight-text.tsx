import { Fragment } from 'react';

import { css } from '@/styled-system/css';

import { removeSpecialSymbols } from './remove-special-symbols';

export const highlightText = (text: string, searchText?: string) => {
  if (!searchText) return text;

  const escapedSearchText = removeSpecialSymbols(searchText);
  const parts = text.split(new RegExp(`(${escapedSearchText})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span key={part + index} className={highlightedTextStyles}>
        {part}
      </span>
    ) : (
      <Fragment key={part + index}>{part}</Fragment>
    ),
  );
};

const highlightedTextStyles = css({
  color: 'primary.swim.총거리.default',
});
