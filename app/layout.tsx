import '../styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import MetaTagImage from '@/public/images/meta-tag.png';
import { css, cx } from '@/styled-system/css';
import { pretendard } from '@/styles/font';

import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Swimie',
  description: '🏊 친구들의 응원과 함께하는 수영일기',
  openGraph: {
    title: 'Swimie',
    description: '🏊 친구들의 응원과 함께하는 수영일기',
    images: [
      {
        url: MetaTagImage.src,
        width: 600,
        height: 400,
        alt: 'Swimie OG Image',
      },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  userScalable: false,
};

const rootStyle = css({
  maxWidth: 'maxWidth',
  width: '100%',
  height: '100dvh',
  margin: '0 auto',
  overflow: 'scroll',
});

const DynamicPortalRoot = dynamic(
  () => import('./portal-root').then(({ PortalRoot }) => PortalRoot),
  {
    ssr: false,
  },
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cx(pretendard.className, htmlStyles)}>
      <body className={rootStyle}>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <div className={containerStyle}>{children}</div>
          <DynamicPortalRoot />
        </ReactQueryProvider>
        <Script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        />
      </body>
    </html>
  );
}

// NOTE: Disable Safari Pull to Refresh
const htmlStyles = css({ overflow: 'hidden', overscrollBehavior: 'none' });

const containerStyle = css({
  minHeight: '100%',

  // NOTE: border option
  '&:before, &:after': {
    content: "''",
    display: 'block',
    width: '1px',
    height: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 9999,
    backgroundColor: '#8a8a8a1a',
  },

  '&:before': {
    right: '50%',
    transform: 'translate(-300px)',
  },

  '&:after': {
    right: '50%',
    transform: 'translate(300px)',
  },
});
