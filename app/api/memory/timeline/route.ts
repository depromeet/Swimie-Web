import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { TimeLineResponse } from '@/features/main/time-line';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorRecordAt = searchParams.get('cursorRecordAt')
    ? `&cursorRecordAt=${searchParams.get('cursorRecordAt')}`
    : '';
  const data = await fetchData<TimeLineResponse>(
    `/memory/timeline${cursorRecordAt}`,
    'GET',
  );

  return NextResponse.json(data);
}
