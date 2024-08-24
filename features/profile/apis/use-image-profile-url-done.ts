'use client';

import { useMutation } from '@tanstack/react-query';

import { ProfileImageUrlDoneResponse } from './dto';

async function imageProfileUrlDone(
  imageName: string,
): Promise<ProfileImageUrlDoneResponse> {
  const res = await fetch('/api/image/profile/url', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageName }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImageProfileUrlDone() {
  return useMutation({
    mutationFn: imageProfileUrlDone,
  });
}
