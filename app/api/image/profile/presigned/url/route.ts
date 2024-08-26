import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ImagePresignedResponse } from '@/features/record';

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Promise<{ imageName: string }>;
  const data = await fetchData<ImagePresignedResponse>(
    `/image/profile/presigned-url`,
    'PUT',
    body,
  );

  return NextResponse.json(data);
}
