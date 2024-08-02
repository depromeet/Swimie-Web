import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { SearchPoolInitialResultResponse } from '@/features/record';

export async function GET() {
  const data = await fetchData<SearchPoolInitialResultResponse>(
    '/pool/search/initial',
    'GET',
  );

  return NextResponse.json(data);
}
