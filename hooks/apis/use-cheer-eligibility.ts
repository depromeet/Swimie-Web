'use client';

import { useQuery } from '@tanstack/react-query';

const fetchCheerEligibility = async (memoryId: number) => {
  const res = await fetch(`/api/memory/${memoryId}/reaction/eligibility`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCheerEligibility = (memoryId: number, isMyMemory?: boolean) => {
  const enabled = !!memoryId && !isMyMemory;

  const query = useQuery<{ data: { isRegistrable: boolean } }>({
    queryKey: ['useCheerEligibility', memoryId],
    queryFn: () => fetchCheerEligibility(memoryId),
    retry: 3,
    enabled,
  });

  return {
    ...query,
    data: query.data?.data,
    refetch: () => enabled && query.refetch(),
  };
};
