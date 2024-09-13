import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NotificationReadResponse } from '@/features/notification';

export async function PATCH() {
  const data = await fetchData<NotificationReadResponse>(
    `/notification/read`,
    'PATCH',
  );

  return NextResponse.json(data);
}
