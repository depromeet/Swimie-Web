import dynamic from 'next/dynamic';

import { Response } from '@/apis';
import { fetchData } from '@/apis/fetch-data';
import { LeftArrowIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { type FollowTab } from '@/features/follow';
import { MemberInfo } from '@/features/main/types';
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

const DynamicFollowingSection = dynamic(
  () =>
    import('@/features/follow').then(
      ({ FollowingSection }) => FollowingSection,
    ),
  {
    ssr: false,
  },
);

const DynamicFollowerSection = dynamic(
  () =>
    import('@/features/follow').then(({ FollowerSection }) => FollowerSection),
  {
    ssr: false,
  },
);

export default async function ProfileFollow({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: FollowTab };
}) {
  const { tab = 'follow' } = searchParams;
  const { data } = await fetchData<Response<MemberInfo>>(
    `/member/${params.id}`,
    'GET',
  );

  if (!data) return null;
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <DynamicBackButton />
        </HeaderBar.LeftContent>
        <HeaderBar.Title>{data.nickname}</HeaderBar.Title>
      </HeaderBar>
      <DynamicTabSection tab={tab} />
      <article className={containerStyle}>
        {tab === 'follow' ? (
          <DynamicFollowerSection id={Number(params.id)} />
        ) : (
          <DynamicFollowingSection id={Number(params.id)} />
        )}
      </article>
    </>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
  p: '16px 20px',
});
