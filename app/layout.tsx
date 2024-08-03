import '../styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';

import { css } from '@/styled-system/css';
import { pretendard } from '@/styles/font';

import { PortalRoot } from './portal-root';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'swimie',
  description: '수영 기록 아카이빙 서비스',
};

const rootStyle = css({
  maxWidth: 'maxWidth',
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  margin: '0 auto',
  borderLeft: '1px solid #eeeeee',
  borderRight: '1px solid #eeeeee',
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
          <PortalRoot />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
