import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SearchPoolInitialResultResponse } from '@/features/record';

export async function GET(
  request: NextRequest,
  { params }: { params: { memoryId: number; cursorId?: number } },
) {
  const { memoryId } = params;
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId');

  const data = await fetchData<SearchPoolInitialResultResponse>(
    `/memory/${memoryId}/reactions/detail?${cursorId ? `cursorId=${cursorId}` : ''}`,
    'GET',
  );

  return NextResponse.json(data);
}
