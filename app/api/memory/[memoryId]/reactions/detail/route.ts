import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SearchPoolInitialResultResponse } from '@/features/record';

export async function GET(
  request: NextRequest,
  { params }: { params: { memoryId: number; cursorId?: number } },
) {
  const { memoryId, cursorId } = params;
  const data = await fetchData<SearchPoolInitialResultResponse>(
    `/memory/${memoryId}/reactions/detail?${cursorId ? `cursorId=${cursorId}` : ''}`,
    'GET',
  );

  return NextResponse.json(data);
}
