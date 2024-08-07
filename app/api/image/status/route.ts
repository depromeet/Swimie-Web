import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ImageStatusResponse } from '@/features/record';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Promise<{ ImageIds: number[] }>;
  const data = await fetchData<ImageStatusResponse>(
    `/image/status`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
