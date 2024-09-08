import { useMutation } from '@tanstack/react-query';

import { MemoryDeleteResponse } from './dto';

async function deleteMemory(memoryId: string): Promise<MemoryDeleteResponse> {
  const res = await fetch(`/api/memory/delete/${Number(memoryId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json() as Promise<MemoryDeleteResponse>;
}

export function useDeleteMemory() {
  return useMutation({
    mutationFn: deleteMemory,
  });
}
