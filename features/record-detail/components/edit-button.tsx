'use client';

import { css } from '@/styled-system/css';

export const EditButton = () => {
  // TODO: edit button click event
  const handleClickEditButton = () => {
    console.log('edit');
  };

  return (
    <button className={editButtonStyle} onClick={handleClickEditButton}>
      수정
    </button>
  );
};

const editButtonStyle = css({
  color: 'primary.swim.총거리.default',
  textStyle: 'body2.normal',
  fontWeight: 'medium',
  mr: '8px',
});
