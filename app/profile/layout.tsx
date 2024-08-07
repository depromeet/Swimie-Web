import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

type Layout = {
  children: ReactNode;
};
const Layout = ({ children }: Layout) => {
  return (
    <div>
      <header>layout 영역입니다</header>
      <div className={childrenWrapperStyle}>{children}</div>
    </div>
  );
};

export default Layout;

const childrenWrapperStyle = css({
  backgroundColor: 'background.gray',
});
