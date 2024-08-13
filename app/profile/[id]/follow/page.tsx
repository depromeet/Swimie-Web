import dynamic from 'next/dynamic';

import { HeaderBar, ProfileListItem } from '@/components/molecules';
import { type FollowTab } from '@/features/follow';
import { flex } from '@/styled-system/patterns';

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
        <div className={headerNicknameStyle}>수영왕 정지영</div>
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

const headerNicknameStyle = flex({
  w: 'full',
  justify: 'center',
  align: 'center',
  color: 'text.normal',
  textStyle: 'heading6',
  fontWeight: 'medium',
});

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  p: '16px 20px',
});
