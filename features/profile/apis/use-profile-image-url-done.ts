'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProfileImageUrlDoneResponse } from './dto';

async function profileImageUrlDone(
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

export function useProfileImageUrlDone(id?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileImageUrlDone,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['currentMember'],
      });
      await queryClient.refetchQueries({
        queryKey: ['profileData', String(id)],
      });
    },
  });
}
