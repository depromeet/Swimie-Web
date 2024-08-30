'use client';

import { useMutation } from '@tanstack/react-query';

const fetchFollow = async (followingId: number) => {
  const res = await fetch(`/api/friend`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followingId }),
  });

  return res.json();
};

export const useFollowMutate = () => {
  const mutate = useMutation({
    mutationFn: (followingId: number) => fetchFollow(followingId),
  });

  return {
    ...mutate,
  };
};
