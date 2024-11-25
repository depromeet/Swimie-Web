import { RefetchOptions } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useProfileData } from '../../hooks';

interface ProfileCardProps {
  isMyProfile: boolean;
  memberId: number;
  refetchMyProfile: (options?: RefetchOptions) => Promise<unknown>;
}

export function ProfileCard({
  isMyProfile,
  memberId,
  refetchMyProfile,
}: ProfileCardProps) {
  const { data: profileData } = useProfileData(memberId);
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(memberId);

  const handleClickFollow = () => {
    void toggleFollow(memberId, refetchMyProfile);
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
          {profileData.introduction
            ? profileData.introduction.length > 22
              ? profileData.introduction.slice(0, 22) + '...'
              : profileData.introduction
            : null}
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
  }),
  followButton: css({
    w: 'full',
    p: '0 20px',
    position: 'absolute',
    bottom: '16px',
  }),
};
