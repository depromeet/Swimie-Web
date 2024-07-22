import '../styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';

import { css } from '@/styled-system/css';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: '어푸',
  description: '수영 기록 아카이빙 서비스',
};

const rootStyle = css({
  maxWidth: 'maxWidth',
  width: '100%',
  margin: '0 auto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className={rootStyle}>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
