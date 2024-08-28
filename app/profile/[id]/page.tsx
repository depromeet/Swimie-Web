'use client';

import { LoadingArea } from '@/components/atoms';
import {
  BackButton,
  GlobalNavigationBar,
  HeaderBar,
} from '@/components/molecules';
import { SettingButton } from '@/components/molecules';
import { useProfileData } from '@/features/profile';
import { MyProfile } from '@/features/profile/components/organisms/my-page';
import { OtherPage } from '@/features/profile/components/organisms/other-page';
import { useFollowingData } from '@/features/profile/hooks/use-following-data';
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
  } = useFollowingData(params.id, isMyProfile);

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
            <HeaderBar.RightContent className={css({ right: '20px' })}>
              {[{ component: <SettingButton />, key: 'setting' }]}
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
