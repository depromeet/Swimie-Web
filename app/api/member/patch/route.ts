import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ProfileTextEditResponse } from '@/features/profile';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Promise<{
    nickname?: string;
    introduction?: string;
  }>;
  const data = await fetchData<ProfileTextEditResponse>(
    `/member`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
