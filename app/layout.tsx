import '../styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';

import { pretendard } from '../styles/font';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: '2팀 최고~',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <body>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
