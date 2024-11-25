import Link from 'next/link';

import { Button } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useProfileData } from '@/features/profile/hooks';
import { useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface ProfileCardProps {
  isMyProfile: boolean;
  memberId: number;
}

export function ProfileCard({ isMyProfile, memberId }: ProfileCardProps) {
  const { data: profileData } = useProfileData(memberId);
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(memberId);

  const handleClickFollow = () => {
    void toggleFollow(memberId);
  };

  if (!profileData) return null;
  return (
    <div className={ProfileCardStyle.layout}>
      <Link href={`/profile/${memberId}`} className={ProfileCardStyle.link}>
        <div className={ProfileCardStyle.image}>
          <ProfileImage
            alt="profile image"
            src={profileData.profileImageUrl}
            fill
            sizes="25vw"
            className={css({ borderRadius: 'full', objectFit: 'cover' })}
          />
        </div>
        <p className={ProfileCardStyle.nickname}>{profileData.nickname}</p>
        <p className={ProfileCardStyle.introduction}>
          {profileData.introduction ? profileData.introduction : null}
        </p>
      </Link>
      <div className={ProfileCardStyle.followButton}>
        {!isMyProfile && (
          <>
            {isFollowing ? (
              <Button
                size="small"
                label="팔로잉"
                variant="outlined"
                buttonType="assistive"
                className={css({ w: 'full' })}
                onClick={handleClickFollow}
              />
            ) : (
              <Button
                size="small"
                label="팔로우"
                variant="outlined"
                buttonType="primary"
                className={css({ w: 'full' })}
                onClick={handleClickFollow}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const ProfileCardStyle = {
  layout: flex({
    position: 'relative',
    direction: 'column',
    alignItems: 'center',
    width: '146px',
    height: '208px',
    backgroundColor: 'fill.normal',
    borderRadius: '10px',
    shrink: 0,
    p: '16px',
  }),
  link: flex({
    position: 'relative',
    direction: 'column',
    alignItems: 'center',
  }),
  image: css({
    position: 'relative',
    w: '60px',
    h: '60px',
    mb: '12px',
  }),
  nickname: css({
    textStyle: 'body2.normal',
    fontWeight: 600,
    mb: '2px',
  }),
  introduction: css({
    textStyle: 'label2',
    fontWeight: 400,
    color: 'text.alternative',
    textAlign: 'center',
    lineClamp: 2,
  }),
  followButton: css({
    w: 'full',
    p: '0 20px',
    position: 'absolute',
    bottom: '16px',
  }),
};
