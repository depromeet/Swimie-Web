import { ReactNode } from 'react';

import { HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

const rootStyle = css({
  maxWidth: 'maxWidth',
  width: '100%',
  margin: '0 auto',
});

const DetailLayout = ({ children }: { children: ReactNode }) => {
  // TODO: edit button click event
  const handleClickEditButton = () => {
    console.log('edit');
  };

  return (
    <div className={rootStyle}>
      <HeaderBar
        rightContent={
          <button
            className={header.editButtonStyle}
            onClick={handleClickEditButton}
          >
            수정
          </button>
        }
      >
        <div className={header.textStyle}>승승의 수영 기록</div>
      </HeaderBar>
      <div className={childrenWrapperStyle}>{children}</div>
    </div>
  );
};

export default DetailLayout;

const childrenWrapperStyle = css({
  padding: '0 20px',
});

const header = {
  textStyle: flex({
    w: 'full',
    justify: 'center',
    align: 'center',
    color: 'text.normal',
    textStyle: 'heading6',
    fontWeight: 'medium',
  }),

  editButtonStyle: css({
    color: 'primary.swim.총거리.default',
    textStyle: 'body2.normal',
    fontWeight: 'medium',
    mr: '8px',
  }),
};
