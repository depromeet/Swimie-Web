import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NotificationResponse } from '@/features/notification';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const data = await fetchData<NotificationResponse>(
    `/notification?cursorId=${searchParams.get('cursorId')}`,
    'GET',
  );

  return NextResponse.json(data);
}
