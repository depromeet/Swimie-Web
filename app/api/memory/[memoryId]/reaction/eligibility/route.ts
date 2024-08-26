import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const data = await fetchData<{ data: { eligibility: boolean } }>(
    `/memory/${Number(params.memoryId)}/reaction/eligibility`,
    'GET',
  );

  return NextResponse.json(data);
}
