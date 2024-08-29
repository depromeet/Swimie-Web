import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export type FollowRequestBody = {
  followingId: number;
};

export type FollowListRequestBody = {
  friends: number[];
};

export async function PUT(request: NextRequest) {
  const body = (await request.json()) as Promise<FollowRequestBody>;
  const data = await fetchData(`/friend`, 'PUT', body);

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<FollowListRequestBody>;
  const data = await fetchData(`/friend`, 'POST', body);

  return NextResponse.json(data);
}
