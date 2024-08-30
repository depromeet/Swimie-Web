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

const DynamicSearchBarSection = dynamic(
  () =>
    import('@/features/profile-search').then(
      ({ SearchBarSection }) => SearchBarSection,
    ),
  {
    ssr: false,
  },
);

const DynamicSearchResultSection = dynamic(
  () =>
    import('@/features/profile-search').then(
      ({ SearchResultSection }) => SearchResultSection,
    ),
  {
    ssr: false,
  },
);

export default function ProfileSearch({
  searchParams,
}: {
  searchParams: { keyword: string };
}) {
  const { keyword = '' } = searchParams;

  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>친구 찾기</HeaderBar.Title>
      </HeaderBar>
      <article className={containerStyle}>
        <DynamicSearchBarSection keyword={keyword} />
        <DynamicSearchResultSection keyword={keyword} />
      </article>
    </>
  );
}

const containerStyle = css({
  pb: 'calc(70px + env(safe-area-inset-bottom))',
});
