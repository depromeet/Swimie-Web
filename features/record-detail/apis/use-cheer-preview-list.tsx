'use client';

import { useQuery } from '@tanstack/react-query';

import { DetailCheerPreview } from '../types';

const fetchCheerPreview = async (memoryId: number) => {
  const res = await fetch(`/api/memory/${memoryId}/reactions`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCheerPreviewList = (memoryId: number) => {
  const query = useQuery<{ data: DetailCheerPreview }>({
    queryKey: ['useCheerPreviewList', memoryId],
    queryFn: () => fetchCheerPreview(memoryId),
    retry: 3,
    enabled: !!memoryId,
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
