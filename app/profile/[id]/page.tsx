'use client';

import {
  BackButton,
  GlobalNavigationBar,
  HeaderBar,
} from '@/components/molecules';
import { SettingButton } from '@/components/molecules';
import { ProfileContainerSkeleton, useProfileData } from '@/features/profile';
import { MyProfile } from '@/features/profile/components/organisms/my-page';
import { OtherPage } from '@/features/profile/components/organisms/other-page';
import { useMemberFollowingState } from '@/hooks';
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

  // TODO: 404 page
  if (profileError || !profileData) {
    return (
      <article className={containerStyle}>
        <HeaderBar>
          <HeaderBar.LeftContent>
            <BackButton />
          </HeaderBar.LeftContent>
        </HeaderBar>
        <div className={css({ padding: '20px', textAlign: 'center' })}>
          멤버가 존재하지 않아요.
        </div>
        <GlobalNavigationBar />
      </article>
    );
  }

  const isMyProfile = profileData.isMyProfile;

  return (
    <article className={containerStyle}>
      <HeaderBar>
        {isMyProfile ? (
          <HeaderBar.RightContent className={css({ right: '20px' })}>
            {[{ component: <SettingButton />, key: 'setting' }]}
          </HeaderBar.RightContent>
        ) : (
          <HeaderBar.LeftContent>
            <BackButton />
          </HeaderBar.LeftContent>
        )}
      </HeaderBar>

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
