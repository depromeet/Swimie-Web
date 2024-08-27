import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import {
  NotificationReadResponse,
  NotificationType,
} from '@/features/notification';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Promise<{
    notificationId: number;
    type: NotificationType;
  }>;
  const data = await fetchData<NotificationReadResponse>(
    `/notification/read`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
