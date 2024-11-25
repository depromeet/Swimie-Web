import { ProfileListItem } from '@/components/molecules';
import { useProfileData } from '@/features/profile/hooks';
import { useCurrentMemberInfo } from '@/hooks';

interface RecommendedProfileItemProps {
  memberId: number;
}

export function RecommendedProfileItem({
  memberId,
}: RecommendedProfileItemProps) {
  const { data: myData } = useCurrentMemberInfo();
  const { data: profileData } = useProfileData(memberId);

  const getIsMyProfile = (memberId: number) => {
    if (!myData?.data) return false;
    const myMemberId = myData?.data.id;
    return myMemberId === memberId;
  };

  if (!profileData) return null;
  return (
    <ProfileListItem
      memberId={memberId}
      nickname={profileData?.nickname}
      introduction={profileData?.introduction}
      profileImageUrl={profileData.profileImageUrl}
      isMyProfile={getIsMyProfile(memberId)}
    />
  );
}
