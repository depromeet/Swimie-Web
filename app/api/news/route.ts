import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NewsResponse } from '@/features/news';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId');
  const queryString = cursorId ? `?cursorId=${cursorId}` : '';
  const data = await fetchData<NewsResponse>(`/news${queryString}`, 'GET');

  return NextResponse.json(data);
}
