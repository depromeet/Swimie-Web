import { cva } from '@/styled-system/css';

import { DetailCheerItem } from '../types';

type CheerItem = {
  isSelected?: boolean;
  onClick?: () => void;
} & DetailCheerItem;

// TODO: 로직 구현에 맞춰 props 수정
export const CheerItem = ({ isSelected, onClick, ...item }: CheerItem) => {
  if (!item?.emoji?.length && !item?.comment?.length) return null;
  return (
    // NOTE: isSelected undefined 대응하여 Boolean 사용
    <button
      className={containerStyle({ isSelected: Boolean(isSelected) })}
      onClick={onClick}
    >
      {item?.emoji?.length && <div>{item.emoji}</div>}
      {item?.comment?.length && <p>{item.comment}</p>}
    </button>
  );
};

const containerStyle = cva({
  base: {
    width: 'fit-content',
    display: 'flex',
    gap: '8px',
    p: '8px 14px',
    color: 'text.normal',
    textStyle: 'body1.normal',
    fontWeight: 'medium',
    border: '1px solid',
    rounded: '8px',
    cursor: 'pointer',
  },
  variants: {
    isSelected: {
      true: {
        color: 'blue.45',
        borderColor: 'blue.90',
        backgroundColor: 'blue.95',
      },
      false: {
        color: 'text.normal',
        borderColor: 'line.neutral',
        backgroundColor: 'white',
      },
    },
  },
});
