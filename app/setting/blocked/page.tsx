import dynamic from 'next/dynamic';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

const DynamicBlockedListSection = dynamic(
  () =>
    import('@/features/setting-blocked').then(
      ({ BlockedListSection }) => BlockedListSection,
    ),
  {
    ssr: false,
  },
);

export default function Blocked() {
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>차단한 계정</HeaderBar.Title>
      </HeaderBar>
      <article className={containerStyle}>
        <DynamicBlockedListSection />
      </article>
    </>
  );
}

const containerStyle = css({
  pb: 'calc(70px + env(safe-area-inset-bottom))',
});
