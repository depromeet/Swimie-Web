'use client';

import { useMutation } from '@tanstack/react-query';

import { NotificationType } from '../types';
import { NotificationReadResponse } from './dto';

async function readNotification(data: {
  notificationId: number;
  type: NotificationType;
}): Promise<NotificationReadResponse> {
  const res = await fetch('/api/notification/read', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useReadNotification() {
  return useMutation({
    mutationFn: readNotification,
  });
}
