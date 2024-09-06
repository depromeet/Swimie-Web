import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { BlockedList } from '@/features/setting-blocked';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId') ?? '';

  const data = await fetchData<BlockedList>(
    `/member/black?cursorId=${cursorId}`,
    'GET',
  );

  return NextResponse.json(data);
}
