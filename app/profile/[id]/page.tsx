'use client';

import { useQuery } from '@tanstack/react-query';

import { LoadingArea, SettingIcon } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { MyProfile } from '@/features/profile/components/organisms/my-page';
import { OtherPage } from '@/features/profile/components/organisms/other-page';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export type ProfileType = 'statistics' | 'badge' | 'record';

export type Mypage = {
  params: { id: number };
};

export interface ProfileProps {
  status: number;
  code: string;
  data: {
    memberId: number;
    nickname: string;
    isMyProfile: boolean;
    followerCount: number;
    followingCount: number;
    introduction: string;
  };
}

const fetchProfileData = async (id: number) => {
  const response = await fetch(`/api/profile/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }
  const data = (await response.json()) as ProfileProps;
  return data;
};

export default function Profile({ params }: Mypage) {
  const { data: profileData, error } = useQuery<ProfileProps['data']>({
    queryKey: ['profileData', params.id],
    queryFn: () => fetchProfileData(params.id).then((data) => data.data),
    enabled: !!params.id,
  });

  if (error) {
    return <div>Error loading profile data</div>;
  }

  if (!profileData) {
    return (
      <div>
        <LoadingArea />
      </div>
    );
  }

  return (
    <article className={containerStyle}>
      <HeaderBar>
        <HeaderBar.RightContent className={css({ right: '20px' })}>
          {[{ component: <SettingIcon />, key: 'setting' }]}
        </HeaderBar.RightContent>
      </HeaderBar>
      {profileData?.isMyProfile ? (
        <MyProfile profileData={profileData} />
      ) : (
        <OtherPage profileData={profileData} />
      )}
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
