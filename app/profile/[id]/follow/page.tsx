import dynamic from 'next/dynamic';

import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar, ProfileListItem } from '@/components/molecules';
import { type FollowTab } from '@/features/follow';
import { flex } from '@/styled-system/patterns';
const DynamicBackButton = dynamic(
  () => import('@/components/molecules').then(({ BackButton }) => BackButton),
  {
    ssr: false,
    loading: () => <LeftArrowIcon />,
  },
);

const DynamicTabSection = dynamic(
  () =>
    import('@/features/follow').then(
      ({ FollowTabSection }) => FollowTabSection,
    ),
  {
    ssr: false,
  },
);

export default function ProfileFollow({
  searchParams,
}: {
  searchParams: { tab: FollowTab };
}) {
  const { tab = 'follow' } = searchParams;

  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>수영왕 정지영</HeaderBar.Title>
      </HeaderBar>
      <DynamicTabSection tab={tab} />
      <article className={containerStyle}>
        <ProfileListItem isFollow={false} />
        <ProfileListItem isFollow={false} />
        <ProfileListItem isFollow={false} />
        <ProfileListItem isFollow={true} />
        <ProfileListItem isFollow={true} />
        <ProfileListItem isFollow={false} />
        <ProfileListItem isFollow={false} />
        <ProfileListItem isFollow={false} />
      </article>
    </>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  p: '16px 20px',
});
