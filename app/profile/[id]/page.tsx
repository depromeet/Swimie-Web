'use client';

import NotFound from '@/app/not-found';
import {
  BackButton,
  GlobalNavigationBar,
  HeaderBar,
} from '@/components/molecules';
import { ProfileContainerSkeleton, useProfileData } from '@/features/profile';
import {
  MyPageHeader,
  MyProfile,
  OtherPage,
  OtherPageHeader,
} from '@/features/profile';
import { useMemberFollowingState } from '@/hooks';
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

  const { useSyncFollowingListState } = useMemberFollowingState();
  useSyncFollowingListState([Number(params.id)]);

  if (isProfileLoading) {
    return (
      <article className={containerStyle}>
        <HeaderBar>
          <HeaderBar.LeftContent>
            <BackButton />
          </HeaderBar.LeftContent>
        </HeaderBar>
        <ProfileContainerSkeleton />
        <GlobalNavigationBar />
      </article>
    );
  }

  // TODO: 1) 차단한 계정 2) 차단 당한 계정 3) 탈퇴한 계정 조회 시 404
  if (profileError || !profileData) {
    return <NotFound />;
  }

  const isMyProfile = profileData.isMyProfile;

  return (
    <article className={containerStyle}>
      {isMyProfile ? (
        <MyPageHeader />
      ) : (
        <OtherPageHeader profileData={profileData} />
      )}

      {isMyProfile ? (
        <MyProfile profileData={profileData} />
      ) : (
        <OtherPage profileData={profileData} />
      )}
      <GlobalNavigationBar />
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
