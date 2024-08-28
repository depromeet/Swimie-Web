import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export type followingProps = {
  followingId: number;
};

export async function PUT(request: NextRequest) {
  const { followingId } = (await request.json()) as followingProps;
  const data = await fetchData(`/friend`, 'PUT', { followingId });

  return NextResponse.json(data);
}
