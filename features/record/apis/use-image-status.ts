'use client';

import { useMutation } from '@tanstack/react-query';

import { ImageStatusResponse } from './dto';

async function imageStatus(imageIds: number[]): Promise<ImageStatusResponse> {
  const res = await fetch('/api/image/status', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageIds }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImageStatus() {
  return useMutation({
    mutationFn: imageStatus,
  });
}
