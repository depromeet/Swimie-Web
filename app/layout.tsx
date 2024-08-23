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
  height: '100dvh',
  margin: '0 auto',
  overflow: 'scroll',
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
          <div className={containerStyle}>{children}</div>
          <PortalRoot />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

const containerStyle = css({
  minHeight: '100%',
  borderLeft: '1px solid #eeeeee',
  borderRight: '1px solid #eeeeee',
});
