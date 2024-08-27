import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/atoms';
import { css } from '@/styled-system/css';

type FollowButtonProps = {
  followingId: number;
  followingInitialValue: boolean;
};

export function FollowButton({
  followingId,
  followingInitialValue,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(followingInitialValue);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/friend', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followingId: followingId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update following status');
      }
      return response.json();
    },
    onSuccess: async () => {
      setIsFollowing(!isFollowing);
      await queryClient.invalidateQueries({
        queryKey: ['profileData'],
      });
    },
    onError: (error) => {
      console.error('Error updating following status:', error);
    },
  });

  const buttonText = isFollowing ? '팔로잉' : '팔로우';
  const buttonVariant = isFollowing ? 'outlined' : 'solid';
  const buttonType = isFollowing ? 'assistive' : 'primary';

  const handleFollowing = () => {
    mutation.mutate();
  };

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
