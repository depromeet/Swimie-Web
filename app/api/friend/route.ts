import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export type FollowRequestBody = {
  followingId: number;
};

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Promise<FollowRequestBody>;
  const data = await fetchData(`/friend`, 'PUT', body);

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  const data = await fetchData(`/friend?${ids ? `ids=${ids}` : ''}`, 'GET');

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { friends } = (await request.json()) as { friends: number };

  const data = await fetchData(`/friend`, 'POST', {
    friends: [Number(friends)],
  });

  return NextResponse.json(data);
}
