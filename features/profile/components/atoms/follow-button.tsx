'use client';

import { Button } from '@/components/atoms';
import { useMemberFollowingState } from '@/hooks';
import { css } from '@/styled-system/css';

import { useProfileData } from '../../hooks';

type FollowButtonProps = {
  followingId: number;
};

export function FollowButton({ followingId }: FollowButtonProps) {
  const { refetch } = useProfileData(followingId);
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(followingId);

  const buttonText = isFollowing ? '팔로잉' : '팔로우';
  const buttonVariant = isFollowing ? 'outlined' : 'solid';
  const buttonType = isFollowing ? 'assistive' : 'primary';

  const handleClickFollow = () => {
    void toggleFollow(followingId, refetch);
  };

  return (
    <Button
      size="small"
      label={buttonText}
      variant={buttonVariant}
      buttonType={buttonType}
      className={css({ width: '100%' })}
      onClick={handleClickFollow}
    />
  );
}
