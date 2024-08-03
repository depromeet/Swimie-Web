'use client';

import { useQuery } from '@tanstack/react-query';

import { MemoryPullResponse } from './dto/memory';

async function pullMemory(memoryId: number) {
  const res = await fetch(`/api/pull/memory/${memoryId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function usePullMemory(memoryId: number) {
  return useQuery<MemoryPullResponse>({
    queryKey: ['usePullMemory'],
    queryFn: () => pullMemory(memoryId),
    retry: 1,
    enabled: !!memoryId,
  });
}
