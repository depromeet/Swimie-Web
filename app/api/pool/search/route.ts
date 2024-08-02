import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SearchPoolInitialResultResponse } from '@/features/record';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nameQueryQuery = `?nameQuery=${searchParams.get('nameQuery')}`;
  const cursorIdQuery = searchParams.get('cursorId')
    ? `&cursorId=${searchParams.get('cursorId')}`
    : '';
  const data = await fetchData<SearchPoolInitialResultResponse>(
    `/pool/search${nameQueryQuery}${cursorIdQuery}`,
    'GET',
  );

  return NextResponse.json(data);
}
