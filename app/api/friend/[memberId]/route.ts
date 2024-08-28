import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { memberId: string } },
) {
  const { memberId } = params;

  const data = await fetchData(`/friend/${memberId}`, 'GET');

  return NextResponse.json(data);
}
