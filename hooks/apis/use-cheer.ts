'use client';

import { useMutation } from '@tanstack/react-query';

import { DetailCheerItem } from '@/features/record-detail';

export type Cheer = {
  memoryId: number;
} & DetailCheerItem;

const fetchCheer = async (params: Cheer) => {
  const res = await fetch(`/api/memory/reaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  return res.json();
};

export const useCheer = () => {
  const mutate = useMutation({
    mutationFn: (params: Cheer) => fetchCheer(params),
  });

  return {
    ...mutate,
  };
};
