import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { CalendarResponse } from '@/features/main/calendar';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const data = await fetchData<CalendarResponse>(
    `/memory/calendar?year=${year}&month=${month}`,
    'GET',
  );

  return NextResponse.json(data);
}
