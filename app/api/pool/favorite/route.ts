import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Promise<{ poolId: number }>;
  const data = await fetchData<string>(`/pool/favorite`, 'PUT', body);

  return NextResponse.json(data);
}
