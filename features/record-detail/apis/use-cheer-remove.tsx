'use client';

import { useMutation } from '@tanstack/react-query';

export type RemoveCheer = {
  reactionId: number;
};

const fetchRemoveCheer = async (reactionId: number) => {
  const res = await fetch(`/api/memory/reaction/${reactionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCheerRemove = () => {
  const mutate = useMutation({
    mutationFn: (reactionId: number) => fetchRemoveCheer(reactionId),
  });

  return {
    ...mutate,
  };
};
