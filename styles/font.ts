import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard/Pretendard-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard/Pretendard-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--pretendard',
});
