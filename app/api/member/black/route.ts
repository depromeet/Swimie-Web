import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { blockMemberProps } from '@/features/profile';
import { BlockedList } from '@/features/setting-blocked';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get('cursorId') ?? '';

  const data = await fetchData<BlockedList>(
    `/member/black?cursorId=${cursorId}`,
    'GET',
  );

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { blackMemberId } = (await request.json()) as { blackMemberId: number };

  const data = await fetchData<blockMemberProps>(`/member/black`, 'POST', {
    blackMemberId,
  });

  return NextResponse.json(data);
}
