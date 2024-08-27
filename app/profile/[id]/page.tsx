'use client';

import { useQuery } from '@tanstack/react-query';

import { LoadingArea, SettingIcon } from '@/components/atoms';
import {
  BackButton,
  GlobalNavigationBar,
  HeaderBar,
} from '@/components/molecules';
import { useProfileData } from '@/features/profile';
import { fetchFollowingData } from '@/features/profile/apis/fetch-following-data';
import { MyProfile } from '@/features/profile/components/organisms/my-page';
import { OtherPage } from '@/features/profile/components/organisms/other-page';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export type Mypage = {
  params: { id: number };
};

export default function Profile({ params }: Mypage) {
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileData(params.id);

  const isMyProfile = profileData?.isMyProfile;

  const {
    data: followingData,
    isLoading: isFollowingLoading,
    error: followingError,
  } = useQuery({
    queryKey: ['followingStatus', params.id],
    queryFn: () =>
      fetchFollowingData(params.id).then((data) => {
        console.log(data);
        return data.data;
      }),

    enabled: isMyProfile !== undefined && !isMyProfile,
  });

  if (profileError) {
    return <div>멤버가 존재하지 않아요.</div>;
  }
  if (isProfileLoading || isFollowingLoading) {
    return <LoadingArea />;
  }

  if (!profileData) {
    return <div>Profile data is not available.</div>;
  }
  if (followingError) {
    return <div>Error fetching following data.</div>;
  }

  return (
    <article className={containerStyle}>
      {isMyProfile ? (
        <>
          <HeaderBar>
            <HeaderBar.RightContent
              className={css({ right: '20px' })}
            ></HeaderBar.RightContent>
            <HeaderBar.RightContent className={css({ right: '20px' })}>
              {[{ component: <SettingIcon />, key: 'setting' }]}
            </HeaderBar.RightContent>
          </HeaderBar>
          <MyProfile profileData={profileData} />
        </>
      ) : (
        <>
          <HeaderBar>
            <HeaderBar.LeftContent>
              <BackButton />
            </HeaderBar.LeftContent>
            <BackButton />
          </HeaderBar>
          <OtherPage
            profileData={profileData}
            followingInitialValue={followingData?.isFollowing || false}
          />
        </>
      )}
      <GlobalNavigationBar />
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
