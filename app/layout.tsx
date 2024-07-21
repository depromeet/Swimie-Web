import './styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';

import { css, cx } from '@/styled-system/css';

import { MAX_LOOT_LAYOUT } from '../constants';
import ReactQueryProvider from './providers/ReactQueryProvider';
import { pretendard } from './styles/font';

export const metadata: Metadata = {
  title: '어푸',
  description: '수영 기록 아카이빙 서비스',
};

const rootStyle = css({
  maxWidth: `${MAX_LOOT_LAYOUT}px`,
  width: '100%',
  margin: '0 auto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cx(pretendard.className, rootStyle)}>
      <body className={rootStyle}>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
