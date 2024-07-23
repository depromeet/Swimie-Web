import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

const rootStyle = css({
  maxWidth: 'maxWidth',
  width: '100%',
  margin: '0 auto',
});

const DetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={rootStyle}>
      <Appbar />
      <div className={childrenWrapperStyle}>{children}</div>
    </div>
  );
};

export default DetailLayout;

/**
 * @description 임시로 사용하는 record-detail page appbar
 */
const Appbar = () => {
  return <div className={appbarStyle}>Appbar content</div>;
};

const appbarStyle = css({
  position: 'sticky',
  top: 0,
});

const childrenWrapperStyle = css({
  padding: '0 24px',
});
