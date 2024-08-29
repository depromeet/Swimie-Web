'use client';

import { useQuery } from '@tanstack/react-query';

import { NotificationCountResponse } from './dto';

async function countNotification() {
  const res = await fetch(`/api/notification/count`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function useCountNotification() {
  return useQuery<NotificationCountResponse>({
    queryKey: ['useCountNotification'],
    queryFn: countNotification,
    retry: 1,
  });
}
