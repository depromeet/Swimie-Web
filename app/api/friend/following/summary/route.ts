import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { FollowingSummaryResponse } from '@/features/news';

export async function GET() {
  const data = await fetchData<FollowingSummaryResponse>(
    '/friend/following/summary',
    'GET',
  );

  return NextResponse.json(data);
}
