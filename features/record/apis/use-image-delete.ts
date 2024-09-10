import { useMutation } from '@tanstack/react-query';

import { ImageDeleteResponse } from './dto/image-delete';

async function imageDelete(memoryId: number): Promise<ImageDeleteResponse> {
  const res = await fetch(`/api/image/delete/${memoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json() as Promise<ImageDeleteResponse>;
}

export function useImageDelete() {
  return useMutation({
    mutationFn: imageDelete,
  });
}
