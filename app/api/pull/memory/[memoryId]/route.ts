import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SearchPoolInitialResultResponse } from '@/features/record';

export async function GET(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const data = await fetchData<SearchPoolInitialResultResponse>(
    `/memory/${Number(params.memoryId)}`,
    'GET',
  );

  return NextResponse.json(data);
}
