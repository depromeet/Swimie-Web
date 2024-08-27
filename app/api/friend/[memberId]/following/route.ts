import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ProfileFollow } from '@/features/follow';

export async function GET(
  request: NextRequest,
  { params }: { params: { memberId: number } },
) {
  const { memberId } = params;
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId');

  const data = await fetchData<ProfileFollow>(
    `/friend/${memberId}/following${cursorId ? `?cursorId=${cursorId}` : ''}`,
    'GET',
  );

  return NextResponse.json(data);
}
