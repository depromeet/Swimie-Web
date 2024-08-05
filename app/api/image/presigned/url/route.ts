import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ImagePresignedResponse } from '@/features/record';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<{ imageNames: string[] }>;
  const data = await fetchData<ImagePresignedResponse>(
    `/image/presigned-url`,
    'POST',
    body,
  );

  return NextResponse.json(data);
}
