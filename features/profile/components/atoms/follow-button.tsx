'use client';

import { Button } from '@/components/atoms';
import { css } from '@/styled-system/css';

import { useFollow } from '../../hooks';

type FollowButtonProps = {
  followingId: number;
  followingInitialValue: boolean;
};

export function FollowButton({
  followingId,
  followingInitialValue,
}: FollowButtonProps) {
  const { isFollowing, handleFollowing } = useFollow({
    followingId,
    followingInitialValue,
  });

  const buttonText = isFollowing ? '팔로잉' : '팔로우';
  const buttonVariant = isFollowing ? 'outlined' : 'solid';
  const buttonType = isFollowing ? 'assistive' : 'primary';

  return (
    <Button
      size="small"
      label={buttonText}
      variant={buttonVariant}
      buttonType={buttonType}
      className={css({ width: '100%' })}
      onClick={handleFollowing}
    />
  );
}
