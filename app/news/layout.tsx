import { ReactNode } from 'react';

import { css } from '@/styled-system/css';

interface NewsLayoutProps {
  children: ReactNode;
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  return <div className={layoutStyle}>{children}</div>;
};

export default NewsLayout;

const layoutStyle = css({
  px: '20px',
});
