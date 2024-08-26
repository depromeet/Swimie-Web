import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ProfileImageUrlDoneResponse } from '@/features/profile';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Promise<{ imageName: string }>;
  const data = await fetchData<ProfileImageUrlDoneResponse>(
    `/image/profile/url`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
