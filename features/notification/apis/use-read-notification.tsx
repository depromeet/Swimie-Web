'use client';

import { useMutation } from '@tanstack/react-query';

import { NotificationReadResponse } from './dto';

async function readNotification(): Promise<NotificationReadResponse> {
  const res = await fetch('/api/notification/read', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useReadNotification() {
  return useMutation({
    mutationFn: readNotification,
  });
}
