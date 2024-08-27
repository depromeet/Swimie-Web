import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type UseFollowProps = {
  followingId: number;
  followingInitialValue: boolean;
};

export function useFollow({
  followingId,
  followingInitialValue,
}: UseFollowProps) {
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
      setIsFollowing((prev) => !prev);
      await queryClient.invalidateQueries({
        queryKey: ['profileData'],
      });
    },
    onError: (error) => {
      console.error('Error updating following status:', error);
    },
  });

  const handleFollowing = () => {
    mutation.mutate();
  };

  return { isFollowing, handleFollowing, mutation };
}
