'use client';

import { useMutation } from '@tanstack/react-query';

import { ProfileTextEditResponse } from './dto';

async function profileTextEdit(data: {
  nickname?: string;
  introduction?: string;
}): Promise<ProfileTextEditResponse> {
  const res = await fetch('/api/member/patch', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useProfileTextEdit() {
  return useMutation({
    mutationFn: profileTextEdit,
  });
}
