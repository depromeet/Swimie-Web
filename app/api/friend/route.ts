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

export async function POST(request: NextRequest) {
  const { friends } = (await request.json()) as { friends: number };

  const data = await fetchData(`/friend`, 'POST', {
    friends: [Number(friends)],
  });

  return NextResponse.json(data);
}
