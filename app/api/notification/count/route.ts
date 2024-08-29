import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NotificationCountResponse } from '@/features/notification';

export async function GET() {
  const data = await fetchData<NotificationCountResponse>(
    `/notification/count`,
    'GET',
  );

  return NextResponse.json(data);
}
