'use client';

import { useMutation } from '@tanstack/react-query';

export type Unblocked = {
  reactionId: number;
};

const fetchRemoveBlocked = async (blackMemberId: number) => {
  const res = await fetch(`/api/member/${blackMemberId}/black`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useUnblocked = () => {
  const mutate = useMutation({
    mutationFn: (blackMemberId: number) => fetchRemoveBlocked(blackMemberId),
  });

  return {
    ...mutate,
  };
};
