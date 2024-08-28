import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ProfileSearch } from '@/features/profile-search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId') ?? '';
  const nameQuery = searchParams.get('nameQuery') ?? '';

  const data = await fetchData<ProfileSearch>(
    `/member/search?nameQuery=${nameQuery}&cursorId=${cursorId}`,
    'GET',
  );

  return NextResponse.json(data);
}
