import { NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

export async function POST() {
  const data = await fetchData(`/member/black`, 'POST');

  return NextResponse.json(data);
}
